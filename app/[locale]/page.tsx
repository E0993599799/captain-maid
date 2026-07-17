/**
 * Captain Maid Homepage
 * CMS-connected with ISR caching
 */

import { notFound } from "next/navigation";
import { Metadata } from "next";
import { cmsClient } from "@/lib/cms/client";
import {
  adaptProducts,
  adaptSolutions,
  adaptArticles,
  getLocalized,
} from "@/lib/cms/adapter";
import { CMSArticle, CMSProduct, CMSSolution, Locale, PaginatedResponse } from "@/types/cms";

// ISR: Revalidate homepage every 30 minutes
export const revalidate = 1800;

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === "th"
      ? "Captain Maid | บ้านสะอาด ชีวิตสุขสวรรค์"
      : "Captain Maid | Clean Homes, Happy Lives";

  const description =
    locale === "th"
      ? "ผลิตภัณฑ์ทำความสะอาดที่เชื่อถือได้ สำหรับครอบครัวไทย ปลอดภัย มีประสิทธิภาพ และเป็นมิตรต่อบ้าน"
      : "Trusted cleaning solutions for Thai families. Safe, effective, and kind to your home.";

  return {
    title,
    description,
    keywords: [
      locale === "th" ? "ผลิตภัณฑ์ทำความสะอาด" : "cleaning products",
      locale === "th" ? "น้ำยาทำความสะอาด" : "household cleaning",
      "captain maid",
      locale === "th" ? "ปลอดภัยและมีประสิทธิภาพ" : "safe and effective",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

/**
 * Fetch homepage data in parallel
 */
async function getHomepageData(locale: Locale) {
  try {
    const [productsResponse, roomSolutionsResponse, problemSolutionsResponse, articlesResponse] =
      await Promise.allSettled([
        cmsClient.getProducts({ limit: 12 }) as Promise<PaginatedResponse<CMSProduct>>,
        cmsClient.getSolutions("room") as Promise<PaginatedResponse<CMSSolution>>,
        cmsClient.getSolutions("problem") as Promise<PaginatedResponse<CMSSolution>>,
        cmsClient.getArticles({ limit: 3 }) as Promise<PaginatedResponse<CMSArticle>>,
      ]);

    return {
      products: productsResponse.status === "fulfilled" ? adaptProducts(productsResponse.value, locale) : null,
      roomSolutions: roomSolutionsResponse.status === "fulfilled" ? adaptSolutions(roomSolutionsResponse.value, locale) : null,
      problemSolutions: problemSolutionsResponse.status === "fulfilled" ? adaptSolutions(problemSolutionsResponse.value, locale) : null,
      articles: articlesResponse.status === "fulfilled" ? adaptArticles(articlesResponse.value, locale) : null,
    };
  } catch (error) {
    console.error("Failed to fetch homepage data:", error);
    return {
      products: null,
      roomSolutions: null,
      problemSolutions: null,
      articles: null,
    };
  }
}

/**
 * Supported locales
 */
export function generateStaticParams() {
  return [{ locale: "th" }, { locale: "en" }];
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;

  // Validate locale
  if (!["th", "en"].includes(locale)) {
    notFound();
  }

  // Fetch data
  const data = await getHomepageData(locale);

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {locale === "th"
                ? "บ้านสะอาด ชีวิตสุขสวรรค์"
                : "Clean Homes, Happy Lives"}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8">
              {locale === "th"
                ? "ผลิตภัณฑ์ทำความสะอาดที่เชื่อถือได้ สำหรับครอบครัวไทย"
                : "Trusted cleaning solutions for Thai families"}
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              {locale === "th" ? "ช้อปเลย" : "Shop Now"}
            </button>
          </div>
        </div>
      </section>

      {/* Trust Benefits Strip */}
      <section className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
              <p className="text-gray-600">
                {locale === "th" ? "ปีของความเชื่อถือได้" : "Years of Trust"}
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
              <p className="text-gray-600">
                {locale === "th" ? "ปลอดภัยและมีประสิทธิภาพ" : "Safe & Effective"}
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">1M+</div>
              <p className="text-gray-600">
                {locale === "th" ? "ครัวเรือนไทย" : "Thai Families"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">
            {locale === "th" ? "หมวดหมู่สินค้า" : "Product Categories"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Placeholder categories - will be replaced by CMS data */}
            <div className="p-6 border rounded-lg hover:shadow-lg transition">
              <div className="text-2xl mb-4">🧹</div>
              <h3 className="font-bold mb-2">
                {locale === "th" ? "ทำความสะอาดพื้น" : "Floor Cleaners"}
              </h3>
              <p className="text-gray-600">
                {locale === "th"
                  ? "น้ำยาทำความสะอาดพื้นที่ลึกลง"
                  : "Deep cleaning solutions"}
              </p>
            </div>
            <div className="p-6 border rounded-lg hover:shadow-lg transition">
              <div className="text-2xl mb-4">🚰</div>
              <h3 className="font-bold mb-2">
                {locale === "th" ? "ทำความสะอาดห้องน้ำ" : "Bathroom Cleaners"}
              </h3>
              <p className="text-gray-600">
                {locale === "th"
                  ? "แก้ปัญหากลิ่นและรา"
                  : "Odor & mold solutions"}
              </p>
            </div>
            <div className="p-6 border rounded-lg hover:shadow-lg transition">
              <div className="text-2xl mb-4">🍽️</div>
              <h3 className="font-bold mb-2">
                {locale === "th" ? "ทำความสะอาดห้องครัว" : "Kitchen Cleaners"}
              </h3>
              <p className="text-gray-600">
                {locale === "th"
                  ? "ลบคราบไขมันได้อย่างมีประสิทธิภาพ"
                  : "Remove grease effectively"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">
            {locale === "th" ? "สินค้าขายดี" : "Best-Selling Products"}
          </h2>
          {data.products && data.products.docs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.products.docs.slice(0, 4).map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
                >
                  {product.images[0] && (
                    <img
                      src={product.images[0].url}
                      alt={product.images[0].alt}
                      className="w-full h-48 object-cover rounded mb-4"
                    />
                  )}
                  <h3 className="font-bold mb-2">
                    {getLocalized(product.name, locale)}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {getLocalized(product.shortDescription, locale)}
                  </p>
                  <a
                    href={`/${locale}/products/${product.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    {locale === "th" ? "ดูรายละเอียด" : "View Details"} →
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              {locale === "th"
                ? "ยังไม่มีข้อมูลสินค้า"
                : "No products available yet"}
            </div>
          )}
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">
            {locale === "th" ? "แนวทางแก้ปัญหา" : "Cleaning Solutions"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Solutions by Room */}
            <div>
              <h3 className="text-2xl font-bold mb-6">
                {locale === "th" ? "ตามห้องต่างๆ" : "By Room"}
              </h3>
              <div className="space-y-4">
                {data.roomSolutions && data.roomSolutions.docs.length > 0 ? (
                  data.roomSolutions.docs.map((solution) => (
                    <a
                      key={solution.id}
                      href={`/${locale}/solutions/room/${solution.slug}`}
                      className="block p-4 border rounded hover:bg-blue-50 transition"
                    >
                      <h4 className="font-semibold">
                        {getLocalized(solution.name, locale)}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {getLocalized(solution.description, locale, "")?.substring(0, 60)}...
                      </p>
                    </a>
                  ))
                ) : (
                  <p className="text-gray-500">
                    {locale === "th"
                      ? "ยังไม่มีข้อมูล"
                      : "No solutions available"}
                  </p>
                )}
              </div>
            </div>

            {/* Solutions by Problem */}
            <div>
              <h3 className="text-2xl font-bold mb-6">
                {locale === "th" ? "ตามปัญหา" : "By Problem"}
              </h3>
              <div className="space-y-4">
                {data.problemSolutions &&
                data.problemSolutions.docs.length > 0 ? (
                  data.problemSolutions.docs.map((solution) => (
                    <a
                      key={solution.id}
                      href={`/${locale}/solutions/problem/${solution.slug}`}
                      className="block p-4 border rounded hover:bg-blue-50 transition"
                    >
                      <h4 className="font-semibold">
                        {getLocalized(solution.name, locale)}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {getLocalized(solution.description, locale, "")?.substring(0, 60)}...
                      </p>
                    </a>
                  ))
                ) : (
                  <p className="text-gray-500">
                    {locale === "th"
                      ? "ยังไม่มีข้อมูล"
                      : "No solutions available"}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">
            {locale === "th" ? "บทความล่าสุด" : "Latest Articles"}
          </h2>
          {data.articles && data.articles.docs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.articles.docs.map((article) => (
                <a
                  key={article.id}
                  href={`/${locale}/blog/${article.slug}`}
                  className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
                >
                  {article.featuredImage && (
                    <img
                      src={article.featuredImage.url}
                      alt={article.featuredImage.alt}
                      className="w-full h-48 object-cover rounded mb-4"
                    />
                  )}
                  <h3 className="font-bold text-lg mb-2">
                    {getLocalized(article.title, locale)}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {getLocalized(article.excerpt, locale)}
                  </p>
                  <span className="text-blue-600 font-semibold">
                    {locale === "th" ? "อ่านเพิ่มเติม" : "Read More"} →
                  </span>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              {locale === "th"
                ? "ยังไม่มีบทความ"
                : "No articles available yet"}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {locale === "th" ? "อย่าพลาดข่าวสาร" : "Stay Updated"}
          </h2>
          <p className="mb-6">
            {locale === "th"
              ? "ติดตามเคล็ดลับการทำความสะอาด และโปรโมชั่นพิเศษ"
              : "Get cleaning tips and special offers"}
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder={locale === "th" ? "อีเมลของคุณ" : "Your email"}
              className="flex-1 px-4 py-3 rounded text-gray-900"
            />
            <button
              type="button"
              className="bg-white text-blue-600 px-6 py-3 rounded font-semibold hover:bg-gray-100 transition"
            >
              {locale === "th" ? "สมัครสมาชิก" : "Subscribe"}
            </button>
          </div>
        </div>
      </section>

      {/* Structured Data - BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: locale === "th" ? "หน้าแรก" : "Home",
                item: `https://captain-maid.vercel.app/${locale}`,
              },
            ],
          }),
        }}
      />

      {/* Structured Data - Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Captain Maid",
            url: "https://captain-maid.vercel.app",
            logo: "https://captain-maid.vercel.app/logo.jpg",
            sameAs: [
              "https://www.facebook.com/captainmaid",
              "https://www.instagram.com/captainmaid",
            ],
          }),
        }}
      />
    </main>
  );
}
