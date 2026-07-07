import { blogPosts as sourceBlogPosts, BlogPost as SourceBlogPost } from '../data/blogPosts';

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

export const blogPosts: BlogPost[] = sourceBlogPosts.map((post: SourceBlogPost) => ({
  id: post.slug,
  slug: post.slug,
  title: post.title,
  category: post.category,
  date: post.date,
  excerpt: post.excerpt,
  image: post.image,
  readTime: post.readTime,
  seoTitle: post.seoTitle,
  seoDescription: post.seoDescription,
  content: post.content,
}));

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return getBlogPostBySlug(slug);
}
