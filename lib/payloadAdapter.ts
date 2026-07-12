// Payload CMS Adapter - fetch and transform product data for frontend
import { Product } from '@/payload-types';

const PAYLOAD_API = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000';

export async function fetchProducts(locale: string = 'en'): Promise<Product[]> {
  try {
    const response = await fetch(`${PAYLOAD_API}/api/products?locale=${locale}&depth=2`, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 }, // ISR: revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`Payload API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.docs || [];
  } catch (error) {
    console.error('Failed to fetch products from Payload:', error);
    return [];
  }
}

export async function fetchProductBySlug(
  slug: string,
  locale: string = 'en'
): Promise<Product | null> {
  try {
    const response = await fetch(
      `${PAYLOAD_API}/api/products?where[slug][equals]=${slug}&locale=${locale}&depth=2`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.docs?.[0] || null;
  } catch (error) {
    console.error(`Failed to fetch product ${slug}:`, error);
    return null;
  }
}

export async function fetchProductsByCategory(
  category: string,
  locale: string = 'en'
): Promise<Product[]> {
  try {
    const response = await fetch(
      `${PAYLOAD_API}/api/products?where[category][equals]=${category}&locale=${locale}&depth=2`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.docs || [];
  } catch (error) {
    console.error(`Failed to fetch products in category ${category}:`, error);
    return [];
  }
}

export function transformProductForDisplay(product: Product) {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    category: product.category,
    image: typeof product.image === 'object' ? product.image.url : product.image,
    features: product.features || [],
    ingredients: product.ingredients || [],
    safetyRating: product.safetyRating,
    ecoFriendly: product.ecoFriendly,
    petSafe: product.petSafe,
    published: product.published,
  };
}
