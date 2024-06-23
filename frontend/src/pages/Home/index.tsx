import ContactUsSection from "./contactus"
import KnowMoreSection from "./featureSection"
import HeroSection from "./heroSection"
import TestimonialSection from "./testimonials"

export const Home = () => {
    return (
        <div>
            <HeroSection />
            <KnowMoreSection />
            <TestimonialSection />
            <ContactUsSection />
        </div>
    )
}
