import type { Metadata } from 'next';
import { site } from '@/data/site';
import { CaptainMaidLandingPage } from '@/components/CaptainMaidLandingPage';
import heroScene from '@/components/assets/landing/01_Brand-Hero_Desktop.png';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Omit<PageProps, 'children'>): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = locale === 'th' ? 'th' : 'en';
  const title =
    currentLocale === 'th'
      ? 'Captain Maid | ผลิตภัณฑ์ทำความสะอาดพรีเมียมสำหรับบ้านสมัยใหม่'
      : 'Captain Maid | Premium Cleaning Products for Modern Homes';
  const description =
    currentLocale === 'th'
      ? 'หน้าแลนดิ้งพรีเมียมของ Captain Maid พร้อม hero carousel 5 สไลด์ ภาพสินค้าแท้จาก assets และการเล่าเรื่องแบรนด์แบบสะอาด ทันสมัย และเชื่อถือได้'
      : 'A premium Captain Maid landing page with a 5-slide hero carousel, real assets-only imagery, and a clean modern brand story built for conversion.';

  return {
    metadataBase: new URL(site.baseUrl),
    title,
    description,
    keywords: [
      'Captain Maid',
      'cleaning products',
      'home care',
      'premium brand',
      'Thailand',
    ],
    alternates: {
      canonical: `/${currentLocale}`,
    },
    openGraph: {
      type: 'website',
      url: `${site.baseUrl}/${currentLocale}`,
      title,
      description,
      siteName: site.brandName,
      images: [
        {
          url: heroScene.src,
          width: 1672,
          height: 941,
          alt: 'Captain Maid premium living-room hero image',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [heroScene.src],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function HomePageRoute() {
  return <CaptainMaidLandingPage />;
}
