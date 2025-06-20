'use client';

import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const faqItems = [
    {
      id: 1,
      question: "What is Fanify?",
      answer:
        "Fanify is a gamified sports hype market built on the Chiliz blockchain. It transforms real-time fan sentiment from social media into tradable digital tokens representing each team’s popularity before a match.",
    },
    {
      id: 2,
      question: "How does social media integration work?",
      answer:
        "We monitor official match hashtags on Twitter using public APIs. Our AI analyzes the content to calculate each team’s hype score, which directly influences the price of fan sentiment tokens.",
    },
    {
      id: 3,
      question: "What are Hype Tokens?",
      answer:
        "Hype Tokens are ERC20 synthetic tokens (e.g., $PSG_HYPE, $BOT_HYPE) that reflect how much fan support a team is receiving online. The more hype a team has, the more valuable its token becomes.",
    },
    {
      id: 4,
      question: "Do I need crypto experience to use Fanify?",
      answer:
        "Not at all. When you sign in with your social account, we automatically create a wallet for you. Fanify is built for mainstream users — no blockchain knowledge required.",
    },
    {
      id: 5,
      question: "How are sentiment scores calculated?",
      answer:
        "We analyze the tone, volume, and engagement of posts containing the match hashtag. Our system classifies each post as pro-team, neutral, or negative and gives it a weighted score based on engagement.",
    },
    {
      id: 6,
      question: "How do tokens change in value?",
      answer:
        "Token prices are influenced by fan hype and in-game events. Goals, wins, and losses trigger minting or burning of tokens, which adjusts supply and affects the market price dynamically.",
    },
    {
      id: 7,
      question: "What happens when the game starts?",
      answer:
        "Trading is automatically paused. Final hype scores are recorded. After the official result, tokens of the losing team are burned and CHZ is distributed to holders of the winning team’s token as a reward.",
    },
    {
      id: 8,
      question: "What can I win by participating?",
      answer:
        "By posting with the official match hashtag, you enter raffles for prizes like fan tokens, collectible NFTs, club merchandise, and exclusive experiences. The more you engage, the higher your chances.",
    },
    {
      id: 9,
      question: "Can I sell my tokens before the match?",
      answer:
        "Yes. Until the match starts, tokens can be traded or locked on-chain. Their price will reflect real-time shifts in fan sentiment and market dynamics.",
    },
    {
      id: 10,
      question: "Is my data safe?",
      answer:
        "Yes. We only use public content shared through hashtags. All collected data is fully anonymized and never linked to personal identities. We follow strict security and privacy standards, and we never sell or share your data without permission.",
    },
    {
      id: 11,
      question: "Why use the Chiliz Chain?",
      answer:
        "Chiliz is the leading blockchain for sports and fan tokens. It offers fast, low-cost transactions and seamless fan engagement tools — perfect for powering real-time, on-chain experiences like Fanify.",
    },
    {
      id: 12,
      question: "How do I get started?",
      answer:
        "Just post your match prediction using the official hashtag (e.g., #Fanify_PSGxBOT_20250620) on Twitter or Instagram. Your post will be picked up automatically and counted toward your team’s hype score.",
    },
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