import Navbar from "../../components/navigation/Navbar";
import Footer from "../../components/navigation/Footer";
import HeroSection from "../../components/landing/HeroSection";
import ServicesSection from "../../components/landing/ServicesSection";
import BenefitsSection from "../../components/landing/BenefitsSection";
import TestimonialsSection from "../../components/landing/TestimonialsSection";
import FAQSection from "../../components/landing/FAQSection";
import NutricionistasSection from "../../components/landing/NutricionistasSection";
import WhatsAppButton from "../../components/landing/WhatsAppButton";

function Home() {
    return(
        <div>
            <Navbar />
            <HeroSection />
            <ServicesSection />
            <BenefitsSection />
            <TestimonialsSection />
            <NutricionistasSection />
            <FAQSection />
            <Footer />
            <WhatsAppButton />
        </div>
    )
}
export default Home;
