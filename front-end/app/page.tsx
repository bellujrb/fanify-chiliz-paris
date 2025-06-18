import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      {/* <HowItWorks /> */}
      <FAQ />
      <Footer />
    </main>
  );
}