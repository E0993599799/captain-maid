import HeroSlider from '@/components/home/HeroSlider'
import ValueProps from '@/components/home/ValueProps'
import SolutionsGrid from '@/components/home/SolutionsGrid'
import SolutionsDeepDive from '@/components/home/SolutionsDeepDive'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import TrustBanner from '@/components/home/TrustBanner'
import WhyCaptainMaid from '@/components/home/WhyCaptainMaid'
import BlogTestimonial from '@/components/home/BlogTestimonial'

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <ValueProps />
      <SolutionsGrid />
      <SolutionsDeepDive />
      <FeaturedProducts />
      <TrustBanner />
      <WhyCaptainMaid />
      <BlogTestimonial />
    </>
  )
}
