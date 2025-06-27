'use client';

import { useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import HowItWorks from '@/components/HowItWorks';
import deployedContracts from '@/lib/deployedContracts';

export default function Home() {
  useEffect(() => {
    // Log contract addresses in a big, prominent way
    console.log('%c🚀 CONTRATOS DEPLOYADOS 🚀', 'font-size: 24px; font-weight: bold; color: #00ff00; background: #000; padding: 10px; border-radius: 5px;');
    console.log(`%c📋 HypeToken: ${deployedContracts.HypeToken.address}`, 'font-size: 18px; font-weight: bold; color: #ff6b6b; background: #000; padding: 5px; border-radius: 3px;');
    console.log(`%c📋 Oracle: ${deployedContracts.Oracle.address}`, 'font-size: 18px; font-weight: bold; color: #4ecdc4; background: #000; padding: 5px; border-radius: 3px;');
    console.log(`%c📋 Funify: ${deployedContracts.Funify.address}`, 'font-size: 18px; font-weight: bold; color: #45b7d1; background: #000; padding: 5px; border-radius: 3px;');
    console.log('%c🎯 ENDEREÇOS DOS CONTRATOS NO CONSOLE! 🎯', 'font-size: 20px; font-weight: bold; color: #ffd93d; background: #000; padding: 10px; border-radius: 5px;');
  }, []);

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <HowItWorks />
      <FAQ />
      <Footer />
    </main>
  );
}