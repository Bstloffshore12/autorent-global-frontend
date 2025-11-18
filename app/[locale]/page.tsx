import { type ResolvedMetadata } from 'next'

import CmsModel from '@/model/CmsModel'
import FaqsSection from '@/sections/FaqsSection'
import HeroSection2 from '@/sections/HeroSection2'
import FleetSection from '@/sections/FleetSliderSection'
import AdvantagesSction from '@/sections/AdvantagesSction'
import BrandSliderSction from '@/sections/BrandSliderSction'
import WhyChooseUsSection from '@/sections/WhyChooseUsSection'
import BlogsSliderSection from '@/sections/BlogsSliderSection'
import HowItWorksSection2 from '@/sections/HowItWorksSection2'
import PartnerSliderSction from '@/sections/PartnerSliderSction'
import ListingSliderSection from '@/sections/ListingSliderSection'
import RentalDocumentSection from '@/sections/RentalDocumentSection'
import RentalGuideSliderSection from '@/sections/RentalGuideSliderSection'
import getHomePageContentAction from '@/actions/pages/getHomePageContentAction'
import CustomerReviewSliderSection from '@/sections/CustomerReviewSliderSection'

// seo meta
export async function generateMetadata(
  {},
  metaData: Promise<ResolvedMetadata>
) {
  const parentMeta = await metaData
  const res = await getHomePageContentAction()

  return CmsModel.setSeoMeta(res, parentMeta)
}

export default function HomePage() {
  return (
    <main className="space-y-8 md:space-y-12">
      <HeroSection2 />
      <FleetSection />
      <ListingSliderSection isFeatured />
      <BrandSliderSction />
      <HowItWorksSection2 />
      <AdvantagesSction />
      <PartnerSliderSction />
      <RentalGuideSliderSection />
      <RentalDocumentSection />
      <FaqsSection />
      <BlogsSliderSection />
      <CustomerReviewSliderSection />
      <WhyChooseUsSection />
    </main>
  )
}
