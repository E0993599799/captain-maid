/**
 * CMS Data Adapter
 * Transforms raw CMS responses to frontend-ready models
 *
 * Responsibilities:
 * - Type conversion
 * - Localization handling
 * - Image optimization setup
 * - Fallback data handling
 * - Cache metadata injection
 */

import {
  CMSMedia,
  CMSProduct,
  CMSArticle,
  CMSCategory,
  CMSSolution,
  CMSNavigation,
  CMSSiteSettings,
  Product,
  Article,
  Category,
  Solution,
  Navigation,
  SiteSettings,
  Image,
  ResponsiveImage,
  Locale,
  LocalizedField,
  CacheOptions,
  PaginatedResponse,
} from "@/types/cms";

// ============================================================================
// LOCALIZATION HELPERS
// ============================================================================

/**
 * Get localized value with fallback
 */
export function getLocalized<T = string>(
  field: LocalizedField<T> | undefined,
  locale: Locale = "th",
  fallback: T | null = null
): T | null {
  if (!field) return fallback;

  const value = field[locale];
  if (value !== undefined && value !== null) return value;

  // Fallback to other locale
  const otherLocale = locale === "th" ? "en" : "th";
  return field[otherLocale] || fallback;
}

/**
 * Get all localized values as object
 */
export function getAllLocalized<T = string>(
  field: LocalizedField<T> | undefined
): LocalizedField<T> {
  return {
    th: field?.th,
    en: field?.en,
  };
}

// ============================================================================
// IMAGE HELPERS
// ============================================================================

/**
 * Transform CMS media to optimized image
 */
export function adaptImage(
  media: CMSMedia | undefined,
  locale: Locale = "th"
): Image | undefined {
  if (!media) return undefined;

  return {
    id: media.id,
    url: media.url,
    alt: getLocalized(media.alt, locale, media.filename) || "",
    width: media.width,
    height: media.height,
  };
}

/**
 * Transform to responsive image with srcset hints
 */
export function adaptResponsiveImage(
  media: CMSMedia | undefined,
  locale: Locale = "th"
): ResponsiveImage | undefined {
  if (!media) return undefined;

  const image = adaptImage(media, locale);
  if (!image) return undefined;

  // Generate srcset for different densities
  // Assumes CMS returns base URL; Next.js Image will handle optimization
  const srcSet = [
    `${image.url} 1x`,
    `${image.url}?q=85&w=${(image.width || 800) * 2} 2x`,
  ].join(", ");

  return {
    ...image,
    srcSet,
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
  };
}

/**
 * Transform media array to responsive images
 */
export function adaptImages(
  media: CMSMedia[] | undefined,
  locale: Locale = "th"
): ResponsiveImage[] {
  if (!media || !Array.isArray(media)) return [];
  return media.map((m) => adaptResponsiveImage(m, locale)!).filter(Boolean);
}

// ============================================================================
// PRODUCT ADAPTER
// ============================================================================

/**
 * Transform CMS product to frontend product
 */
export function adaptProduct(
  cmsProduct: CMSProduct,
  locale: Locale = "th"
): Product {
  return {
    ...cmsProduct,
    images: adaptImages(cmsProduct.images, locale),
    suitableSurfaces: (cmsProduct.suitableSurfaces || []) as any,
    suitableRooms: (cmsProduct.suitableRooms || []) as any,
  };
}

/**
 * Transform paginated products
 */
export function adaptProducts(
  response: PaginatedResponse<CMSProduct>,
  locale: Locale = "th"
): PaginatedResponse<Product> {
  return {
    ...response,
    docs: response.docs.map((p) => adaptProduct(p, locale)),
  };
}

/**
 * Format product price for display
 */
export function formatPrice(price: number | undefined, locale: Locale = "th"): string {
  if (price === undefined) return "-";

  return new Intl.NumberFormat(locale === "th" ? "th-TH" : "en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

// ============================================================================
// ARTICLE ADAPTER
// ============================================================================

/**
 * Transform CMS article to frontend article
 */
export function adaptArticle(
  cmsArticle: CMSArticle,
  locale: Locale = "th"
): Article {
  return {
    ...cmsArticle,
    featuredImage: adaptResponsiveImage(cmsArticle.featuredImage, locale)!,
  };
}

/**
 * Transform paginated articles
 */
export function adaptArticles(
  response: PaginatedResponse<CMSArticle>,
  locale: Locale = "th"
): PaginatedResponse<Article> {
  return {
    ...response,
    docs: response.docs.map((a) => adaptArticle(a, locale)),
  };
}

// ============================================================================
// CATEGORY ADAPTER
// ============================================================================

/**
 * Transform CMS category to frontend category
 */
export function adaptCategory(
  cmsCategory: CMSCategory,
  locale: Locale = "th"
): Category {
  return {
    ...cmsCategory,
    image: cmsCategory.image ? adaptResponsiveImage(cmsCategory.image, locale) : undefined,
  };
}

/**
 * Transform paginated categories
 */
export function adaptCategories(
  response: PaginatedResponse<CMSCategory>,
  locale: Locale = "th"
): PaginatedResponse<Category> {
  return {
    ...response,
    docs: response.docs.map((c) => adaptCategory(c, locale)),
  };
}

// ============================================================================
// SOLUTION ADAPTER
// ============================================================================

/**
 * Transform CMS solution to frontend solution
 */
export function adaptSolution(
  cmsSolution: CMSSolution,
  locale: Locale = "th"
): Solution {
  return {
    ...cmsSolution,
    image: cmsSolution.image
      ? adaptResponsiveImage(cmsSolution.image, locale)
      : undefined,
  };
}

/**
 * Transform paginated solutions
 */
export function adaptSolutions(
  response: PaginatedResponse<CMSSolution>,
  locale: Locale = "th"
): PaginatedResponse<Solution> {
  return {
    ...response,
    docs: response.docs.map((s) => adaptSolution(s, locale)),
  };
}

// ============================================================================
// SITE SETTINGS ADAPTER
// ============================================================================

/**
 * Transform CMS site settings to frontend settings
 */
export function adaptSiteSettings(
  cmsSettings: CMSSiteSettings,
  locale: Locale = "th"
): SiteSettings {
  return {
    ...cmsSettings,
    logo: cmsSettings.logo ? adaptImage(cmsSettings.logo, locale) : undefined,
    favicon: cmsSettings.favicon
      ? adaptImage(cmsSettings.favicon, locale)
      : undefined,
  };
}

// ============================================================================
// NAVIGATION ADAPTER
// ============================================================================

/**
 * Transform CMS navigation to frontend navigation
 */
export function adaptNavigation(
  cmsNav: CMSNavigation,
  locale: Locale = "th"
): Navigation {
  // Transform navigation items recursively
  const transformItems = (items: any[]): any[] => {
    return items.map((item) => ({
      id: item.id,
      label: getLocalized(item.label, locale),
      href: item.href,
      external: item.external,
      children: item.children ? transformItems(item.children) : undefined,
    }));
  };

  return {
    ...cmsNav,
    items: transformItems(cmsNav.items),
  };
}

// ============================================================================
// CACHE OPTIONS BUILDERS
// ============================================================================

/**
 * Get cache options for a route
 */
export function getCacheOptions(route: string, context?: string): CacheOptions {
  // Product pages: revalidate every hour
  if (route.startsWith("/products/")) {
    return { revalidate: 3600, tags: ["products", context || "product-detail"] };
  }

  // Solution pages: revalidate every 2 hours
  if (route.startsWith("/solutions/")) {
    return { revalidate: 7200, tags: ["solutions", context || "solution"] };
  }

  // Article pages: revalidate every hour
  if (route.startsWith("/blog/")) {
    return { revalidate: 3600, tags: ["articles", context || "article"] };
  }

  // Homepage: revalidate every 30 minutes
  if (route === "/" || route === "") {
    return { revalidate: 1800, tags: ["homepage"] };
  }

  // Default: 1 hour
  return { revalidate: 3600, tags: [route] };
}

// ============================================================================
// FALLBACK DATA
// ============================================================================

/**
 * Create fallback product when CMS is unavailable
 */
export function createFallbackProduct(name: string): Product {
  return {
    id: "fallback",
    name: { th: name, en: name },
    slug: name.toLowerCase().replace(/\s+/g, "-"),
    sku: "N/A",
    brand: "unknown",
    category: "unknown",
    images: [],
    shortDescription: { th: "Coming soon", en: "Coming soon" },
    description: { th: "Coming soon", en: "Coming soon" },
    usage: { th: "See full details", en: "See full details" },
    technology: { th: "Advanced", en: "Advanced" },
    safetyNote: { th: "Follow product instructions", en: "Follow product instructions" },
    featured: false,
    status: "published",
    suitableSurfaces: [],
    suitableRooms: [],
    cleaningProblems: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Create fallback article when CMS is unavailable
 */
export function createFallbackArticle(title: string): Article {
  return {
    id: "fallback",
    title: { th: title, en: title },
    slug: title.toLowerCase().replace(/\s+/g, "-"),
    excerpt: { th: "Coming soon", en: "Coming soon" },
    content: { th: "Coming soon", en: "Coming soon" },
    author: "Unknown",
    featuredImage: {
      id: "fallback",
      url: "/images/placeholder.jpg",
      alt: title,
    },
    articleType: "blog",
    featured: false,
    status: "published",
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Check if content is published
 */
export function isPublished(content: { status?: string }): boolean {
  return content.status === "published";
}

/**
 * Filter published items from array
 */
export function filterPublished<T extends { status?: string }>(items: T[]): T[] {
  return items.filter(isPublished);
}

/**
 * Format reading time
 */
export function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Generate SEO-friendly URL slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
