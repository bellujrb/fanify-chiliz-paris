'use client';

import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const faqItems = [
    {
      id: 1,
      question: "What is Fanify and how does it work?",
      answer:
        "Fanify is a revolutionary fan engagement platform built on Chiliz Chain. We analyze real-time social media sentiment to create dynamic Fan Tokens that reflect collective fan excitement. Users can trade these tokens, earn rewards, and participate in exclusive experiences with their favorite teams.",
    },
    {
      id: 2,
      question: "How do I get started with Fanify?",
      answer:
        "Getting started is simple! Connect your Web3 wallet (like MetaMask), choose your favorite teams, and start trading Fan Tokens. New users receive a welcome bonus of 100 points and an exclusive NFT badge to kickstart their journey.",
    },
    {
      id: 3,
      question: "What are Fan Tokens and how do they work?",
      answer:
        "Fan Tokens are digital assets that represent fan sentiment and engagement for specific teams. Their value fluctuates based on real-time social media activity, team performance, and community engagement. You can trade these tokens to potentially profit from your sports knowledge.",
    },
    {
      id: 4,
      question: "Is Fanify safe and secure?",
      answer:
        "Absolutely. Fanify is built on Chiliz Chain, a secure blockchain specifically designed for sports. We use industry-standard security practices, and your wallet remains under your complete control. We never store your private keys or personal information.",
    },
    {
      id: 5,
      question: "What rewards can I earn on Fanify?",
      answer:
        "You can earn CHZ tokens, exclusive NFTs, team merchandise, VIP experiences, and access to special events. Rewards are distributed based on your ranking, trading activity, and social engagement. Top performers receive legendary NFTs and premium experiences.",
    },
    {
      id: 6,
      question: "Which teams and sports are available?",
      answer:
        "Fanify features 150+ sports partners including major football clubs like FC Barcelona, PSG, Juventus, and AC Milan. We're constantly expanding to include more teams across football, basketball, esports, and other popular sports.",
    },
    {
      id: 7,
      question: "How does the ranking system work?",
      answer:
        "Your ranking is determined by your trading performance, social engagement, and overall platform activity. Higher ranks unlock better rewards and exclusive privileges. Rankings reset monthly, giving everyone a fresh chance to climb the leaderboard.",
    },
    {
      id: 8,
      question: "What fees does Fanify charge?",
      answer:
        "Fanify charges minimal trading fees (typically 1-2%) and leverages Chiliz Chain's low transaction costs. There are no hidden fees, and all costs are transparently displayed before you confirm any transaction.",
    },
    {
      id: 9,
      question: "Can I use Fanify on mobile devices?",
      answer:
        "Yes! Fanify is fully responsive and works seamlessly on all devices. You can also use mobile Web3 wallets like MetaMask Mobile or Trust Wallet to access all features on the go.",
    },
    {
      id: 10,
      question: "How do I contact support?",
      answer:
        "Our support team is available 24/7 through our help center, live chat, and community Discord. We also have comprehensive documentation and video tutorials to help you get the most out of Fanify.",
    },
  ];  

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-red-50 border border-red-200 rounded-full mb-8">
            <HelpCircle className="w-4 h-4 mr-2 text-red-600" />
            <span className="text-red-600 text-sm font-semibold">SUPPORT</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6">
            Frequently Asked <span className="text-red-500">Questions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about Fanify and how we're revolutionizing 
            sports engagement through blockchain technology
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full text-left p-6 rounded-2xl flex justify-between items-center transition-colors group"
              >
                <h3 className="text-lg font-bold text-gray-900 pr-4 group-hover:text-red-600 transition-colors">
                  {item.question}
                </h3>
                <div className={`flex-shrink-0 w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center transition-transform duration-300 ${
                  openItem === item.id ? 'rotate-45' : ''
                }`}>
                  {openItem === item.id ? (
                    <Minus className="w-4 h-4 text-white" />
                  ) : (
                    <Plus className="w-4 h-4 text-white" />
                  )}
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openItem === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-6 pb-6">
                  <div className="w-full h-px bg-gray-200 mb-4"></div>
                  <p className="text-gray-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
            <h3 className="text-2xl font-black text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our team is here to help you get started with Fanify
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-red-500 text-white rounded-2xl font-bold hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Contact Support
              </button>
              <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-2xl font-bold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;