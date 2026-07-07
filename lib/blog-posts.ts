const { blogPosts: sourceBlogPosts, getBlogPost: getSourceBlogPost } = require('../data/blogPosts') as any;

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  category: { th: string; en: string };
  date: string;
  excerpt: string;
  image: string;
  readTime: string;
  seoTitle: string;
  seoDescription: string;
  content?: string;
};

export const blogPosts: BlogPost[] = sourceBlogPosts.map((post) => ({
  id: post.slug,
  slug: post.slug,
  title: post.title,
  category: { th: post.category, en: post.category },
  date: post.publishedAt,
  excerpt: post.excerpt,
  image: post.coverImage.src,
  readTime: post.readTime,
  seoTitle: post.seoTitle,
  seoDescription: post.seoDescription,
  content: post.content,
}));

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug) ?? undefined;
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return getBlogPostBySlug(slug) ?? (getSourceBlogPost(slug) as BlogPost | undefined);
}
