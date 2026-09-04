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

import { CMSException, GraphQLResponse, Locale, CmsSectionResponse, CMSPage } from "../../types/cms";

const API_URL = process.env.NEXT_PUBLIC_CMS_URL || "https://cms.arigeo.com";
const SITE_SLUG = process.env.CMS_SITE_SLUG || "captain-maid";
const READ_TOKEN = process.env.CMS_READ_TOKEN || "";
const PREVIEW_SECRET = process.env.CMS_PREVIEW_SECRET || "";
const API_TIMEOUT = 10000;

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
  private brandIdPromise?: Promise<string | number>;

  constructor(
    baseUrl: string = API_URL,
    siteSlug: string = SITE_SLUG,
    readToken: string = READ_TOKEN,
    previewSecret: string = PREVIEW_SECRET
  ) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.siteSlug = siteSlug;
    this.readToken = readToken;
    this.previewSecret = previewSecret;
  }

  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { timeout = API_TIMEOUT, retries = 2, draft = false, ...fetchOptions } = options;
    if (!this.baseUrl) throw new CMSException("CMS_NOT_CONFIGURED", "CMS URL is not configured", 503);

    const url = new URL(endpoint, this.baseUrl);
    if (draft && this.previewSecret) {
      url.searchParams.append("draft", "true");
      url.searchParams.append("token", this.previewSecret);
    }

    const headers = new Headers(fetchOptions.headers);
    headers.set("Content-Type", "application/json");
    if (this.readToken) headers.set("Authorization", `Bearer ${this.readToken}`);

    let lastError: Error | null = null;
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        const response = await fetch(url.toString(), { ...fetchOptions, headers, signal: controller.signal });
        clearTimeout(timeoutId);
        if (!response.ok) throw await this.parseError(response);
        return (await response.json()) as T;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        if (error instanceof CMSException && error.statusCode < 500 && error.statusCode !== 429) throw error;
        if (attempt === retries) throw lastError;
        await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 100));
      }
    }
    throw lastError || new Error("Request failed");
  }

  private async parseError(response: Response): Promise<CMSException> {
    try {
      const data = (await response.json()) as { message?: string; error?: string; code?: string; [key: string]: unknown };
      return new CMSException(data.code || `HTTP_${response.status}`, data.message || data.error || response.statusText, response.status, data);
    } catch {
      return new CMSException(`HTTP_${response.status}`, response.statusText, response.status);
    }
  }

  async restGet<T>(collection: string, params: Record<string, unknown> = {}, options: RequestOptions = {}): Promise<T> {
    const url = new URL(`/api/${collection}`, this.baseUrl);
    const appendParam = (key: string, value: unknown) => {
      if (value === undefined || value === null) return;
      if (Array.isArray(value)) return value.forEach((item) => appendParam(`${key}[]`, item));
      if (typeof value === "object") {
        Object.entries(value as Record<string, unknown>).forEach(([childKey, childValue]) => appendParam(`${key}[${childKey}]`, childValue));
        return;
      }
      url.searchParams.append(key, String(value));
    };
    Object.entries(params).forEach(([key, value]) => appendParam(key, value));
    return this.request<T>(url.toString(), { method: "GET", ...options });
  }

  async query<T>(query: string, variables?: Record<string, unknown>, options: RequestOptions = {}): Promise<T> {
    const response = await this.request<GraphQLResponse<T>>(`${this.baseUrl}/api/graphql`, {
      method: "POST",
      body: JSON.stringify({ query, variables }),
      ...options,
    });
    if (response.errors?.length) throw new CMSException("GRAPHQL_ERROR", response.errors[0].message, 400, { errors: response.errors });
    if (!response.data) throw new CMSException("GRAPHQL_ERROR", "No data in response", 500);
    return response.data;
  }

  private async getBrandId(slug: string): Promise<string | number> {
    if (!this.brandIdPromise) {
      this.brandIdPromise = this.restGet<{ docs?: Array<{ id?: string | number; slug?: string }> }>("brands", {
        limit: 20,
        depth: 0,
      }).then((response) => {
        const brand = (response.docs || []).find((brand) => brand.slug === slug);
        if (brand?.id === undefined || brand.id === null) {
          throw new CMSException("CMS_BRAND_NOT_FOUND", `CMS brand not found: ${slug}`, 404);
        }
        return brand.id;
      });
    }
    return this.brandIdPromise;
  }

  async getProducts(filters: { locale?: Locale; limit?: number; page?: number } = {}, options: RequestOptions = {}) {
    const brandId = await this.getBrandId(this.siteSlug);
    return this.restGet("products", {
      where: { brand: { equals: brandId }, contentStatus: { equals: "approved" } },
      locale: filters.locale || "th",
      fallbackLocale: "en",
      depth: 2,
      limit: filters.limit || 20,
      page: filters.page || 1,
      sort: "-createdAt",
    }, options);
  }

  async getProduct(slug: string, locale: Locale = "th", options: RequestOptions = {}) {
    const brandId = await this.getBrandId(this.siteSlug);
    return this.restGet("products", {
      where: { brand: { equals: brandId }, slug: { equals: slug }, contentStatus: { equals: "approved" } },
      locale,
      fallbackLocale: "en",
      depth: 2,
      limit: 1,
    }, options);
  }

  async getCategories(filters: { locale?: Locale } = {}, options: RequestOptions = {}) {
    return this.restGet("product-categories", { where: { segment: { equals: "household" } }, sort: "name", ...(filters.locale && { locale: filters.locale }) }, options);
  }

  async getSolutions(type: "room" | "problem", filters: { locale?: Locale } = {}, options: RequestOptions = {}) {
    return this.restGet("solutions", { where: { type: { equals: type }, status: { equals: "published" }, ...(filters.locale && { locale: { equals: filters.locale } }) }, sort: "name" }, options);
  }

  async getSolution(type: "room" | "problem", slug: string, options: RequestOptions = {}) {
    return this.restGet("solutions", { where: { type: { equals: type }, slug: { equals: slug }, status: { equals: "published" } }, limit: 1 }, options);
  }

  async getArticles(filters: { locale?: Locale; limit?: number; page?: number } = {}, options: RequestOptions = {}) {
    return this.restGet("articles", { where: { site: { equals: this.siteSlug }, status: { equals: "published" } }, limit: filters.limit || 10, page: filters.page || 1, sort: "-publishedAt" }, options);
  }

  async getArticle(slug: string, options: RequestOptions = {}) {
    return this.restGet("articles", { where: { site: { equals: this.siteSlug }, slug: { equals: slug }, status: { equals: "published" } }, limit: 1 }, options);
  }

  async getNavigation(locale: Locale = "th", options: RequestOptions = {}) {
    return this.restGet("navigation", { where: { site: { equals: this.siteSlug }, locale: { equals: locale } }, limit: 1 }, options);
  }

  async getSiteSettings(locale: Locale = "th", options: RequestOptions = {}) {
    return this.restGet("site-settings", { where: { site: { equals: this.siteSlug }, locale: { equals: locale } }, limit: 1 }, options);
  }

  async submitForm(formType: string, data: Record<string, unknown>, options: RequestOptions = {}) {
    return this.request(`${this.baseUrl}/api/forms`, { method: "POST", body: JSON.stringify({ site: this.siteSlug, formType, data }), ...options });
  }

  async getPage(slug: string, locale: Locale = "th", options: RequestOptions = {}): Promise<{ docs?: CMSPage[] }> {
    return this.restGet("pages", { where: { site: { equals: this.siteSlug }, slug: { equals: slug }, _status: { equals: "published" } }, locale, depth: 2, limit: 1 }, options);
  }

  async getSections(pageSlug: string, locale: Locale = "th", options: RequestOptions = {}) {
    return this.restGet<CmsSectionResponse>("sections", { where: { site: { equals: this.siteSlug }, pageSlug: { equals: pageSlug }, active: { equals: true }, _status: { equals: "published" } }, sort: "order", depth: 2, locale }, options);
  }

  async isHealthy(): Promise<boolean> {
    try {
      await this.request<{ version?: string }>(`${this.baseUrl}/api/health`, { method: "GET", timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}

export const cmsClient = new CMSClient();
export default CMSClient;
