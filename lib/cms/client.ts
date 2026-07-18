/**
 * Payload CMS API Client
 * Handles HTTP requests to Brand Content Platform
 *
 * Features:
 * - REST and GraphQL support
 * - Request/response logging
 * - Error handling & retries
 * - Auth token management
 * - Timeout handling
 */

import { CMSException, GraphQLResponse, Locale } from "@/types/cms";

const API_URL = process.env.NEXT_PUBLIC_CMS_URL || "";
const SITE_SLUG = process.env.CMS_SITE_SLUG || "captain-maid";
const READ_TOKEN = process.env.CMS_READ_TOKEN || "";
const PREVIEW_SECRET = process.env.CMS_PREVIEW_SECRET || "";
const API_TIMEOUT = 10000; // 10 seconds

interface RequestOptions extends RequestInit {
  timeout?: number;
  retries?: number;
  draft?: boolean;
}

class CMSClient {
  private baseUrl: string;
  private siteSlug: string;
  private readToken: string;
  private previewSecret: string;

  constructor(
    baseUrl: string = API_URL,
    siteSlug: string = SITE_SLUG,
    readToken: string = READ_TOKEN,
    previewSecret: string = PREVIEW_SECRET
  ) {
    this.baseUrl = baseUrl.replace(/\/$/, ""); // Remove trailing slash
    this.siteSlug = siteSlug;
    this.readToken = readToken;
    this.previewSecret = previewSecret;
  }

  /**
   * Make HTTP request with error handling and retries
   */
  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const {
      timeout = API_TIMEOUT,
      retries = 2,
      draft = false,
      ...fetchOptions
    } = options;

    if (!this.baseUrl) {
      throw new CMSException("CMS_NOT_CONFIGURED", "CMS URL is not configured", 503);
    }

    const url = new URL(endpoint, this.baseUrl);

    // Add draft mode if requested
    if (draft && this.previewSecret) {
      url.searchParams.append("draft", "true");
      url.searchParams.append("token", this.previewSecret);
    }

    // Add read token to headers
    const headers = new Headers(fetchOptions.headers);
    headers.set("Content-Type", "application/json");

    if (this.readToken) {
      headers.set("Authorization", `Bearer ${this.readToken}`);
    }

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url.toString(), {
          ...fetchOptions,
          headers,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const error = await this.parseError(response);
          throw error;
        }

        const data = await response.json();
        return data as T;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));

        // Don't retry on 4xx errors (except 429)
        if (error instanceof CMSException && error.statusCode < 500) {
          if (error.statusCode !== 429) {
            throw error;
          }
        }

        // Last attempt failed
        if (attempt === retries) {
          throw lastError;
        }

        // Wait before retry (exponential backoff)
        const delay = Math.pow(2, attempt) * 100;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    throw lastError || new Error("Request failed");
  }

  /**
   * Parse error response from CMS
   */
  private async parseError(response: Response): Promise<CMSException> {
    try {
      const data = (await response.json()) as {
        message?: string;
        error?: string;
        code?: string;
        [key: string]: unknown;
      };

      const message = data.message || data.error || response.statusText;
      const code = data.code || `HTTP_${response.status}`;

      return new CMSException(code, message, response.status, data);
    } catch {
      return new CMSException(
        `HTTP_${response.status}`,
        response.statusText,
        response.status
      );
    }
  }

  /**
   * Make REST API call
   */
  async restGet<T>(
    collection: string,
    params: Record<string, unknown> = {},
    options: RequestOptions = {}
  ): Promise<T> {
    const url = new URL(`/api/${collection}`, this.baseUrl);

    // Add query parameters
    const appendParam = (key: string, value: unknown) => {
      if (value === undefined || value === null) return;
      if (Array.isArray(value)) {
        value.forEach((item) => appendParam(`${key}[]`, item));
        return;
      }
      if (typeof value === "object") {
        Object.entries(value as Record<string, unknown>).forEach(([childKey, childValue]) => {
          appendParam(`${key}[${childKey}]`, childValue);
        });
        return;
      }
      url.searchParams.append(key, String(value));
    };

    Object.entries(params).forEach(([key, value]) => appendParam(key, value));

    return this.request<T>(url.toString(), {
      method: "GET",
      ...options,
    });
  }

  /**
   * Make GraphQL query
   */
  async query<T>(
    query: string,
    variables?: Record<string, unknown>,
    options: RequestOptions = {}
  ): Promise<T> {
    const endpoint = `${this.baseUrl}/api/graphql`;

    const response = await this.request<GraphQLResponse<T>>(endpoint, {
      method: "POST",
      body: JSON.stringify({
        query,
        variables,
      }),
      ...options,
    });

    if (response.errors && response.errors.length > 0) {
      const error = response.errors[0];
      throw new CMSException("GRAPHQL_ERROR", error.message, 400, {
        errors: response.errors,
      });
    }

    if (!response.data) {
      throw new CMSException("GRAPHQL_ERROR", "No data in response", 500);
    }

    return response.data;
  }

  /**
   * Fetch products for captain-maid site
   */
  async getProducts(
    filters: { locale?: Locale; limit?: number; page?: number } = {},
    options: RequestOptions = {}
  ) {
    return this.restGet(
      "products",
      {
        where: { contentStatus: { equals: "approved" } },
        locale: filters.locale || "th",
        fallbackLocale: "en",
        depth: 2,
        limit: filters.limit || 20,
        page: filters.page || 1,
        sort: "-createdAt",
      },
      options
    );
  }

  /**
   * Fetch single product by slug
   */
  async getProduct(slug: string, locale: Locale = "th", options: RequestOptions = {}) {
    return this.restGet(
      "products",
      {
        where: {
          slug: { equals: slug },
          contentStatus: { equals: "approved" },
        },
        locale,
        fallbackLocale: "en",
        depth: 2,
        limit: 1,
      },
      options
    );
  }

  /**
   * Fetch categories
   */
  async getCategories(filters: { locale?: Locale } = {}, options: RequestOptions = {}) {
    return this.restGet(
      "product-categories",
      {
        where: {
          segment: { equals: "household" },
        },
        sort: "name",
        ...(filters.locale && { locale: filters.locale }),
      },
      options
    );
  }

  /**
   * Fetch solutions (by room or problem)
   */
  async getSolutions(
    type: "room" | "problem",
    filters: { locale?: Locale } = {},
    options: RequestOptions = {}
  ) {
    return this.restGet(
      "solutions",
      {
        where: {
          type: { equals: type },
          status: { equals: "published" },
          ...(filters.locale && { locale: { equals: filters.locale } }),
        },
        sort: "name",
      },
      options
    );
  }

  /**
   * Fetch solution detail by slug
   */
  async getSolution(type: "room" | "problem", slug: string, options: RequestOptions = {}) {
    return this.restGet(
      "solutions",
      {
        where: {
          type: { equals: type },
          slug: { equals: slug },
          status: { equals: "published" },
        },
        limit: 1,
      },
      options
    );
  }

  /**
   * Fetch articles
   */
  async getArticles(
    filters: { locale?: Locale; limit?: number; page?: number } = {},
    options: RequestOptions = {}
  ) {
    return this.restGet(
      "articles",
      {
        where: {
          site: { equals: this.siteSlug },
          status: { equals: "published" },
        },
        limit: filters.limit || 10,
        page: filters.page || 1,
        sort: "-publishedAt",
      },
      options
    );
  }

  /**
   * Fetch article detail by slug
   */
  async getArticle(slug: string, options: RequestOptions = {}) {
    return this.restGet(
      "articles",
      {
        where: {
          site: { equals: this.siteSlug },
          slug: { equals: slug },
          status: { equals: "published" },
        },
        limit: 1,
      },
      options
    );
  }

  /**
   * Fetch navigation
   */
  async getNavigation(locale: Locale = "th", options: RequestOptions = {}) {
    return this.restGet(
      "navigation",
      {
        where: {
          site: { equals: this.siteSlug },
          locale: { equals: locale },
        },
        limit: 1,
      },
      options
    );
  }

  /**
   * Fetch site settings
   */
  async getSiteSettings(locale: Locale = "th", options: RequestOptions = {}) {
    return this.restGet(
      "site-settings",
      {
        where: {
          site: { equals: this.siteSlug },
          locale: { equals: locale },
        },
        limit: 1,
      },
      options
    );
  }

  /**
   * Submit form
   */
  async submitForm(
    formType: string,
    data: Record<string, unknown>,
    options: RequestOptions = {}
  ) {
    return this.request(
      `${this.baseUrl}/api/forms`,
      {
        method: "POST",
        body: JSON.stringify({
          site: this.siteSlug,
          formType,
          data,
        }),
        ...options,
      }
    );
  }

  /**
   * Fetch page by slug
   */
  async getPage(slug: string, options: RequestOptions = {}) {
    return this.restGet(
      "pages",
      {
        where: {
          site: { equals: this.siteSlug },
          slug: { equals: slug },
          status: { equals: "published" },
        },
        limit: 1,
      },
      options
    );
  }

  /**
   * Check if CMS is available
   */
  async isHealthy(): Promise<boolean> {
    if (!this.baseUrl) return false;
    try {
      await this.request<{ version?: string }>(`${this.baseUrl}/api/health`, {
        method: "GET",
        timeout: 5000,
      });
      return true;
    } catch {
      return false;
    }
  }
}

// Export singleton instance
export const cmsClient = new CMSClient();

export default CMSClient;
