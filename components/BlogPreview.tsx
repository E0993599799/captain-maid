import { getAllBlogPosts } from '@/data/blogPosts';
import { Link } from '@/lib/navigation';
import Image from 'next/image';

export function BlogPreview() {
  const latestPosts = getAllBlogPosts().slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-text-primary mb-12">
          เคล็ดลับและบทความ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 p-6 flex flex-col">
                  <p className="text-sm text-primary mb-2">{post.category.th}</p>
                  <h3 className="text-xl font-bold text-text-primary mb-4 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-text-secondary line-clamp-3 flex-grow">
                    {post.excerpt}
                  </p>
                  <div className="border-t mt-4 pt-4 text-xs text-text-secondary flex justify-between items-center">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/blog" className="font-semibold text-primary hover:underline">
            อ่านบทความทั้งหมด
          </Link>
        </div>
      </div>
    </section>
  );
}
