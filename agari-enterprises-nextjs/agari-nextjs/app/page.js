import Header from '@/components/Header';
import Hero from '@/components/Hero';
import OffersBanner from '@/components/OffersBanner';
import { Heritage, Proprietor } from '@/components/Heritage';
import About from '@/components/About';
import RepairServices from '@/components/RepairServices';
import OrderCatalog from '@/components/OrderCatalog';
import BrandMarquee from '@/components/BrandMarquee';
import Gallery from '@/components/Gallery';
import { HowItWorks, WhyUs } from '@/components/HowItWorks';
import RequestForm from '@/components/RequestForm';
import Reviews from '@/components/Reviews';
import Locations from '@/components/Locations';
import FAQSection from '@/components/FAQSection';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <OffersBanner />
        <Heritage />
        <About />
        <RepairServices />
        <OrderCatalog />
        <BrandMarquee />
        <Gallery />
        <HowItWorks />
        <Proprietor />
        <WhyUs />
        <Reviews />
        <RequestForm />
        <Locations />
        <FAQSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
