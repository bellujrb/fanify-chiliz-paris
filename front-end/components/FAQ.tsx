'use client';

import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, Twitter } from 'lucide-react';

const FAQ = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const faqItems = [
    {
      id: 1,
      question: "What is Fanify?",
      answer:
        "Fanify is the first decentralized hype market for sports. Before each major match, fans shape the odds through social media activity and by staking CHZ or team tokens. Here, it's not a betting house or algorithm — the community sets the odds based on real-time hype.",
    },
    {
      id: 2,
      question: "How are odds created on Fanify?",
      answer:
        "Odds are dynamically generated based on fan engagement: posts, likes, shares, and staking volume for each team. The more hype your team generates across social media and the blockchain, the more the odds shift in its favor.",
    },
    {
      id: 3,
      question: "What does it mean to 'bet on the hype'?",
      answer:
        "'Betting on the hype' means staking tokens on the team you believe has momentum — before the rest of the world notices. If your team wins or beats the odds created by the community, you earn rewards. Timing and community insight are key.",
    },
    {
      id: 4,
      question: "Do I need to understand blockchain to use Fanify?",
      answer:
        "Not at all! Fanify is designed for every sports fan. You can connect a Web3 wallet like MetaMask, Trust Wallet, or even your Socios.com account — which is fully compatible with Chiliz Chain. All the blockchain magic happens behind the scenes. You just need to support your team and join the hype.",
    },
    {
      id: 5,
      question: "How is Fanify related to Chiliz and Socios.com?",
      answer:
        "Fanify is built on Chiliz Chain, the same blockchain powering Socios.com — the home of official Fan Tokens for teams like PSG, Barcelona, and Juventus. While Socios focuses on fan voting and collectibles, Fanify brings a competitive layer: fans use those tokens to influence odds, trade hype, and earn based on match outcomes.",
    },
    {
      id: 6,
      question: "What rewards can I earn?",
      answer:
        "You can earn CHZ tokens, collectible NFTs, exclusive team merchandise, VIP access to matches, and more. Rewards depend on your activity, your accuracy in reading hype trends, and how early you joined the movement before the match.",
    },
    {
      id: 7,
      question: "Do I have to pay to use Fanify?",
      answer:
        "No, it's free to join and participate in social challenges. If you want to stake and influence the odds directly, you'll need CHZ or Fan Tokens — but you can still be active and climb the leaderboard without spending money.",
    },
    {
      id: 8,
      question: "Can I use Fanify on mobile?",
      answer:
        "Yes! Fanify is fully mobile-friendly. You can access it through your browser and connect using mobile wallets like MetaMask Mobile, Trust Wallet, or the Socios.com app. Engage in hype battles wherever you are.",
    },
    {
      id: 9,
      question: "Which teams and sports are available?",
      answer:
        "Fanify supports over 150 teams from the Chiliz ecosystem, including global giants like PSG, FC Barcelona, Juventus, AC Milan, and many more. We're constantly expanding into football, basketball, esports, and other sports where hype rules.",
    },
    {
      id: 10,
      question: "How do I get help if I need support?",
      answer:
        "Our team is available 24/7 through Discord, live chat, and our Help Center. We also provide step-by-step guides and tutorials to help you set up, stake, and start dominating the hype game.",
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
          <div className="inline-flex items-center px-4 py-2 bg-brand-50 border border-brand-200 rounded-full mb-8">
            <HelpCircle className="w-4 h-4 mr-2 text-brand-600" />
            <span className="text-brand-600 text-sm font-semibold">SUPPORT</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6">
            Frequently Asked <span className="text-brand-500">Questions</span>
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
                <h3 className="text-lg font-bold text-gray-900 pr-4 group-hover:text-brand-600 transition-colors">
                  {item.question}
                </h3>
                <div className={`flex-shrink-0 w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center transition-transform duration-300 ${
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
              <button className="px-8 py-3 bg-brand-500 text-white rounded-2xl font-bold hover:bg-brand-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
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