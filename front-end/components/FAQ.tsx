'use client';

import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const faqItems = [
    {
      id: 1,
      question: "What is Fanify?",
      answer: "Fanify is a revolutionary platform that connects athletes with their fans through Instagram and blockchain technology. We use Chiliz Chain to create a transparent, rewarding ecosystem where fan engagement translates into real rewards and exclusive experiences."
    },
    {
      id: 2,
      question: "How does the Instagram integration work?",
      answer: "Our platform monitors your Instagram engagement in real-time through secure APIs. We track comments, mentions, hashtags, and overall reach to calculate fan loyalty points. All data is processed securely and used only to enhance the fan-athlete relationship."
    },
    {
      id: 3,
      question: "What are Fan Tokens and how do I earn them?",
      answer: "Fan Tokens are digital assets on the Chiliz blockchain that represent your loyalty to an athlete. You earn tokens by engaging with your favorite athlete's content on Instagram - the more you interact, comment, and share, the more tokens you accumulate each month."
    },
    {
      id: 4,
      question: "Do I need a crypto wallet to participate?",
      answer: "Not necessarily! If you already have a wallet, you can connect it instantly. If you're new to crypto, Fanify creates a secure wallet for you automatically - no technical knowledge required. We make Web3 accessible to everyone."
    },
    {
      id: 5,
      question: "How are monthly rankings calculated?",
      answer: "Rankings are based on your engagement score, which considers the quality and frequency of your interactions with an athlete's content. Points are awarded for comments, shares, and mentions. Rankings reset monthly to give everyone a fresh chance to compete."
    },
    {
      id: 6,
      question: "What kind of rewards can I win?",
      answer: "Athletes configure their own reward systems! Common rewards include exclusive NFTs, signed merchandise, meet-and-greet opportunities, early access to content, personalized messages, and special Fan Tokens. Each athlete creates unique experiences for their top fans."
    },
    {
      id: 7,
      question: "Is my data secure on Fanify?",
      answer: "Absolutely. We use enterprise-grade security and only access public Instagram data that you choose to share. Your personal information is encrypted and stored securely. We never sell your data, and you maintain full control over your privacy settings."
    },
    {
      id: 8,
      question: "Can athletes customize their fan engagement programs?",
      answer: "Yes! Athletes have complete control over their reward structure. They can set different prize tiers, customize point values for various interactions, create exclusive NFT collections, and design unique experiences for their most dedicated fans."
    },
    {
      id: 9,
      question: "How does Chiliz blockchain enhance the experience?",
      answer: "Chiliz Chain provides transparency, security, and true ownership of digital assets. All transactions are recorded on the blockchain, ensuring fair distribution of rewards. Fan Tokens and NFTs are truly yours - you can trade, collect, or hold them as proof of your fandom."
    },
    {
      id: 10,
      question: "How do I get started with Fanify?",
      answer: "Simply connect your wallet (or let us create one for you), link your Instagram account, and start engaging with your favorite athletes' content. The platform automatically tracks your engagement and awards points. It's that simple - no technical expertise required!"
    }
  ];

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-red-400 to-pink-400 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-20 blur-xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-red-600 text-white rounded-full text-sm font-medium shadow-lg mb-8">
            <HelpCircle className="w-4 h-4 mr-2" />
            FAQ's
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Frequently Asked Questions
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
              className="bg-white rounded-2xl border border-purple-500/20 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full text-left p-6 rounded-2xl flex justify-between items-center transition-colors group"
              >
                <h3 className="text-lg font-bold text-gray-900 pr-4 group-hover:text-purple-600 transition-colors">
                  {item.id}. {item.question}
                </h3>
                <div className={`flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-600 to-red-600 rounded-lg flex items-center justify-center transition-transform duration-300 ${
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
                  <div className="w-full h-px bg-gradient-to-r from-purple-200 via-pink-200 to-red-200 mb-4"></div>
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
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-purple-500/20">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our team is here to help you get started with Fanify
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-red-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                Contact Support
              </button>
              <button className="px-8 py-3 border-2 border-purple-500/20 text-gray-700 rounded-full font-semibold hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:border-purple-500/40 transition-all duration-300">
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