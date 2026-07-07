import { Product } from '@/data/products';
import { BlogPost } from '@/data/blogPosts';
import { FaqItem } from '@/data/faqs';
import { siteConfig } from '@/data/site';

type Breadcrumb = {
  name: string;
  href: string;
};

interface SEOJsonLdProps {
  product?: Product;
  blogPost?: BlogPost;
  faqs?: FaqItem[];
  breadcrumbs?: Breadcrumb[];
  type: 'product' | 'article' | 'faq' | 'organization' | 'breadcrumb';
}

const renderJsonLd = (data: object) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export function SEOJsonLd({ product, blogPost, faqs, breadcrumbs, type }: SEOJsonLdProps) {
  const lang = 'th'; // Assuming 'th' for now, can be dynamic later

  switch (type) {
    case 'organization':
      return renderJsonLd({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': siteConfig.name,
        'url': siteConfig.baseUrl,
        'logo': new URL(siteConfig.defaultOgImage, siteConfig.baseUrl).toString(),
      });

    case 'product':
      if (!product) return null;
      return renderJsonLd({
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': product.productName[lang],
        'description': product.seoDescription[lang],
        'image': new URL(product.images[0], siteConfig.baseUrl).toString(),
        'sku': product.id,
        'brand': {
          '@type': 'Brand',
          'name': 'Captain Maid',
        },
        'offers': {
          '@type': 'Offer',
          'price': product.priceText.replace('฿', ''),
          'priceCurrency': 'THB',
          'availability': 'https://schema.org/InStock',
          'url': new URL(`/products/${product.slug}`, siteConfig.baseUrl).toString(),
        },
      });

    case 'article':
      if (!blogPost) return null;
      return renderJsonLd({
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': blogPost.title,
        'description': blogPost.seoDescription,
        'image': new URL(blogPost.image, siteConfig.baseUrl).toString(),
        'datePublished': blogPost.date,
        'author': {
          '@type': 'Organization',
          'name': 'Captain Maid',
        },
      });

    case 'faq':
      if (!faqs) return null;
      return renderJsonLd({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqs.map(faq => ({
          '@type': 'Question',
          'name': faq.question[lang],
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer[lang],
          },
        })),
      });

    case 'breadcrumb':
      if (!breadcrumbs) return null;
      return renderJsonLd({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          'position': index + 1,
          'name': crumb.name,
          'item': new URL(crumb.href, siteConfig.baseUrl).toString(),
        })),
      });

    default:
      return null;
  }
}
