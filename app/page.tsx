import Navbar          from "@/components/Navbar";
import Hero             from "@/components/Hero";
import TrustBar         from "@/components/TrustBar";
import AboutUs          from "@/components/AboutUs";
import Problem          from "@/components/Problem";
import Solutions        from "@/components/Solutions";
import VisionMission    from "@/components/VisionMission";
import CaseStudies      from "@/components/CaseStudies";
import Products         from "@/components/Products";
import Process          from "@/components/Process";
import FounderMessage   from "@/components/FounderMessage";
import Testimonials     from "@/components/Testimonials";
import Pricing          from "@/components/Pricing";
import FAQ              from "@/components/FAQ";
import FinalCTA         from "@/components/FinalCTA";
import Footer           from "@/components/Footer";
import FloatingButtons  from "@/components/FloatingButtons";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* 1. Hook */}
        <Hero />
        {/* 2. Social proof */}
        <TrustBar />
        {/* 3. Who we are */}
        <AboutUs />
        {/* 4. Why you need AI */}
        <Problem />
        {/* 5. What we offer */}
        <Solutions />
        {/* 6. Direction */}
        <VisionMission />
        {/* 7. Proof of work */}
        <CaseStudies />
        {/* 9. Our products */}
        <Products />
        {/* 10. How we work */}
        <Process />
        {/* 11. Personal touch */}
        <FounderMessage />
        {/* 12. Client voices */}
        <Testimonials />
        {/* 13. Investment */}
        <Pricing />
        {/* 14. Questions */}
        <FAQ />
        {/* 16. Final push */}
        <FinalCTA />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
