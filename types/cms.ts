/**
 * Captain Maid CMS Content Types
 * Type-safe contracts for all content from Brand Content Platform
 *
 * Naming convention:
 * - CMS* = Raw API response from Payload
 * - * = Frontend-ready model (transformed)
 */

// ============================================================================
// LOCALIZATION
// ============================================================================

export interface LocalizedField<T = string> {
  th?: T;
  en?: T;
}

export type Locale = "th" | "en";

// ============================================================================
// MEDIA & IMAGES
// ============================================================================

export interface CMSMedia {
  id: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width?: number;
  height?: number;
  url: string;
  alt?: LocalizedField;
  createdAt: string;
  updatedAt: string;
}

export interface Image {
  id: string;
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ResponsiveImage extends Image {
  srcSet?: string;
  sizes?: string;
  placeholder?: string; // base64 blur placeholder
}

// ============================================================================
// SEO & METADATA
// ============================================================================

export interface SEO {
  title?: LocalizedField;
  description?: LocalizedField;
  keywords?: LocalizedField;
  ogImage?: Image;
  ogType?: string;
  canonicalUrl?: string;
  robotsIndex?: boolean;
}

// ============================================================================
// PRODUCTS
// ============================================================================

export interface CMSProductVariant {
  id: string;
  sku: string;
  size: string;
  volume?: string;
  priceUSD?: number;
}

export interface CMSProductBenefit {
  id: string;
  title: LocalizedField;
  description: LocalizedField;
}

export interface CMSProductClaim {
  id: string;
  claim: LocalizedField;
  verified: boolean;
}

export interface CMSProduct {
  id: string;
  name: LocalizedField;
  slug: string;
  sku: string;
  brand: string;
  category: string;
  images: CMSMedia[];
  shortDescription: LocalizedField;
  description: LocalizedField;
  usage: LocalizedField;
  benefits?: CMSProductBenefit[];
  claims?: CMSProductClaim[];
  suitableSurfaces?: string[]; // floor, marble, tile, etc.
  suitableRooms?: string[]; // kitchen, bathroom, bedroom
  cleaningProblems?: string[]; // grease, mold, odor
  technology: LocalizedField;
  fragrance?: LocalizedField;
  safetyNote: LocalizedField;
  variants?: CMSProductVariant[];
  relatedProducts?: string[]; // product IDs
  shopLinks?: {
    platform: string; // lazada, shopee, official-store
    url: string;
    label: LocalizedField;
  }[];
  featured: boolean;
  status: "draft" | "published";
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
}

export interface Product
  extends Omit<CMSProduct, "images" | "suitableSurfaces" | "suitableRooms"> {
  images: ResponsiveImage[];
  suitableSurfaces: Surface[];
  suitableRooms: Room[];
}

export type Surface =
  | "floor"
  | "marble"
  | "tile"
  | "wood"
  | "glass"
  | "stainless-steel"
  | "granite";

export type Room = "kitchen" | "bathroom" | "bedroom" | "living-room" | "office";

export type CleaningProblem =
  | "grease"
  | "mold"
  | "odor"
  | "dirt"
  | "stains"
  | "soap-scum";

// ============================================================================
// CATEGORIES
// ============================================================================

export interface CMSCategory {
  id: string;
  name: LocalizedField;
  slug: string;
  description: LocalizedField;
  icon?: string; // emoji or icon name
  image?: CMSMedia;
  featured: boolean;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
}

export interface Category extends Omit<CMSCategory, "image"> {
  image?: ResponsiveImage;
}

// ============================================================================
// SOLUTIONS (by room / by problem)
// ============================================================================

export interface CMSSolution {
  id: string;
  type: "room" | "problem"; // room: kitchen, problem: grease
  key: string; // kitchen, grease
  name: LocalizedField;
  slug: string;
  description: LocalizedField;
  image?: CMSMedia;
  relatedProducts: string[]; // product IDs
  tips?: LocalizedField;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
}

export interface Solution extends Omit<CMSSolution, "image"> {
  image?: ResponsiveImage;
}

// ============================================================================
// ARTICLES / BLOG
// ============================================================================

export interface CMSArticle {
  id: string;
  title: LocalizedField;
  slug: string;
  excerpt: LocalizedField;
  content: LocalizedField; // rich text
  author: string;
  featuredImage: CMSMedia;
  articleType: "blog" | "guide" | "news";
  category?: string;
  tags?: string[];
  relatedProducts?: string[]; // product IDs
  readingTime?: number; // minutes
  featured: boolean;
  status: "draft" | "published";
  publishedAt: string;
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
}

export interface Article extends Omit<CMSArticle, "featuredImage"> {
  featuredImage: ResponsiveImage;
}

// ============================================================================
// NAVIGATION
// ============================================================================

export interface CMSNavigationItem {
  id: string;
  label: LocalizedField;
  href: string;
  children?: CMSNavigationItem[];
  external?: boolean;
}

export interface CMSNavigation {
  id: string;
  site: "captain-maid";
  locale: Locale;
  items: CMSNavigationItem[];
  updatedAt: string;
}

export interface Navigation extends CMSNavigation {}

// ============================================================================
// SITE SETTINGS & GLOBALS
// ============================================================================

export interface CMSSiteSettings {
  id: string;
  site: "captain-maid";
  locale: Locale;
  companyName: LocalizedField;
  tagline: LocalizedField;
  description: LocalizedField;
  logo?: CMSMedia;
  favicon?: CMSMedia;
  phone?: string;
  email?: string;
  address?: LocalizedField;
  socialLinks?: {
    platform: string; // facebook, instagram, tiktok
    url: string;
  }[];
  contactFormEmail?: string;
  updatedAt: string;
}

export interface SiteSettings extends Omit<CMSSiteSettings, "logo" | "favicon"> {
  logo?: ResponsiveImage;
  favicon?: Image;
}

// ============================================================================
// PAGES
// ============================================================================

export interface CMSPageBlock {
  id: string;
  type: string; // hero, text, gallery, cta, products, testimonials
  data: Record<string, any>;
}

export interface CMSPage {
  id: string;
  title: LocalizedField;
  slug: string;
  description: LocalizedField;
  blocks?: CMSPageBlock[];
  status: "draft" | "published";
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
}

export interface Page extends CMSPage {}

// ============================================================================
// FORM SUBMISSIONS
// ============================================================================

export interface FormSubmission {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  consent: boolean;
}

// ============================================================================
// API RESPONSES
// ============================================================================

export interface PaginatedResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{
    message: string;
    extensions?: Record<string, any>;
  }>;
}

// ============================================================================
// DRAFT PREVIEW
// ============================================================================

export interface DraftMode {
  isEnabled: boolean;
  secret?: string;
}

export interface PreviewToken {
  token: string;
  expiresAt: number;
}

// ============================================================================
// ERROR HANDLING
// ============================================================================

export interface CMSError {
  message: string;
  code: string;
  statusCode: number;
  details?: Record<string, any>;
}

export class CMSException extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 500,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = "CMSException";
  }
}

// ============================================================================
// CACHE
// ============================================================================

export interface CacheOptions {
  revalidate?: number; // ISR revalidation time in seconds
  tags?: string[]; // for on-demand revalidation
  stale?: boolean; // allow stale data
}
