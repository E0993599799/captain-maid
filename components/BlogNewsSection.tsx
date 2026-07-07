import { BlogPreview } from './BlogPreview';
import { blogPosts } from '@/data/blogPosts';
import { useTranslations } from 'next-intl';

export function BlogNewsSection() {
  const t = useTranslations();
  
  return (
    <BlogPreview 
      posts={blogPosts.slice(0, 3)} 
      title={t('blog.title')} 
      subtitle={t('blog.subtitle')} 
    />
  );
}
