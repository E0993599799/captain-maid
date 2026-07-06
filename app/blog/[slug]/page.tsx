'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { NavigationEnhanced } from '@/components/NavigationEnhanced';
import { Footer } from '@/components/Footer';
import { getBlogPost } from '@/lib/blog-posts';

function renderMarkdown(md: string): string {
  let html = md
    // Remove \r
    .replace(/\r/g, '')
    // Split into lines
    .split('\n')
    .map((line) => {
      // Headers
      if (line.startsWith('### ')) return `<h3>${line.slice(4)}</h3>`;
      if (line.startsWith('## ')) return `<h2>${line.slice(3)}</h2>`;
      if (line.startsWith('# ')) return '';

      // Bold + italic
      let processed = line
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>');

      // Unordered list
      if (processed.match(/^- \*\*(.+?)\*\*/)) {
        return `<li>${processed.replace(/^- /, '')}</li>`;
      }
      if (processed.match(/^- /)) {
        return `<li>${processed.replace(/^- /, '')}</li>`;
      }

      // Numbered list
      if (processed.match(/^\d+\. /)) {
        return `<li>${processed.replace(/^\d+\. /, '')}</li>`;
      }

      // Empty line
      if (!processed.trim()) return '';

      return `<p>${processed}</p>`;
    })
    .join('\n');

  // Wrap consecutive <li> in <ul> or <ol>
  html = html.replace(/((?:<li>.*?\n?)+)/g, (match) => {
    const isOrdered = md.includes('\n1. ');
    const tag = isOrdered ? 'ol' : 'ul';
    return `<${tag}>\n${match}</${tag}>`;
  });

  return html;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = getBlogPost(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <NavigationEnhanced />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-4">
          <h1 className="text-2xl font-bold text-[#001360]">ไม่พบเนื้อหา</h1>
          <p className="text-[#506090]">ไม่พบบทความที่คุณค้นหา</p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#02a6e3] font-semibold hover:underline"
          >
            <ArrowLeft size={20} /> กลับไปหน้าบล็อก
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const contentHtml = renderMarkdown(post.content);

  return (
    <div className="min-h-screen bg-white">
      <NavigationEnhanced />

      {/* Article Header */}
      <div className="bg-gradient-to-br from-[#EAF6FD] to-[#90D0F0] py-12 md:py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#02a6e3] hover:underline mb-6"
            >
              <ArrowLeft size={18} /> กลับไปหน้าบล็อก
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-[#001360] mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-[#506090]">
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                {new Date(post.date).toLocaleDateString('th-TH')}
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} />
                {post.readTime}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose-custom"
        >
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </motion.div>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#02a6e3] hover:underline"
          >
            <ArrowLeft size={18} /> กลับไปหน้าบล็อก
          </Link>
        </div>
      </div>

      <Footer />

      {/* Blog content styles */}
      <style jsx global>{`
        .blog-content h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #001360;
          margin-top: 2rem;
          margin-bottom: 1rem;
          line-height: 1.4;
        }
        .blog-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #001360;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .blog-content p {
          font-size: 1rem;
          line-height: 1.9;
          color: #334155;
          margin-bottom: 1rem;
        }
        .blog-content ul, .blog-content ol {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }
        .blog-content li {
          font-size: 1rem;
          line-height: 1.8;
          color: #334155;
          margin-bottom: 0.5rem;
        }
        .blog-content li > ul {
          margin: 0.25rem 0;
          padding-left: 1.5rem;
        }
        .blog-content strong {
          color: #001360;
        }
        .blog-content em {
          color: #02a6e3;
        }
      `}</style>
    </div>
  );
}