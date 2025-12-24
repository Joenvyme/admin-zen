import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/sections/hero-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { PainPointsSection } from "@/components/sections/pain-points-section"
import { HowItWorksSection } from "@/components/sections/how-it-works-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { PricingSection } from "@/components/sections/pricing-section"
import { FAQSection } from "@/components/sections/faq-section"
import { WaitlistFormSection } from "@/components/sections/waitlist-form-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main id="main-content">
      <Navigation />
      <HeroSection />
      <TestimonialsSection />
      <PainPointsSection />
      <HowItWorksSection />
      <FeaturesSection />
      <PricingSection />
      <FAQSection />
      <WaitlistFormSection />
      <Footer />
    </main>
  )
}

