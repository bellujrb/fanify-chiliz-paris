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
        "Fanify is a gamified fan prediction market powered by social media sentiment. We analyze real-time posts on platforms like Twitter and Instagram to generate dynamic Fan Sentiment Tokens on the Chiliz blockchain, turning collective fan hype into tradable value.",
    },
    {
      id: 2,
      question: "How does the social media integration work?",
      answer:
        "We use secure APIs to track public posts, hashtags, and mentions related to upcoming matches. This data feeds into our sentiment engine, which builds real-time hype indexes that influence token behavior and drive engagement-based raffles and rewards.",
    },
    {
      id: 3,
      question: "What are Fan Sentiment Tokens?",
      answer:
        "They are synthetic tokens that reflect the collective expectation of fans for each team. As positive sentiment increases for a team, its token ($PSG, $REAL, etc.) grows in value. Fans can trade these tokens before the match and profit based on hype shifts.",
    },
    {
      id: 4,
      question: "Do I need crypto knowledge to use Fanify?",
      answer:
        "Not at all. You can log in with your social account and we'll create a crypto wallet for you automatically. Fanify is designed for mainstream users — no prior blockchain experience needed.",
    },
    {
      id: 5,
      question: "How are sentiment scores calculated?",
      answer:
        "We analyze volume, tone, and engagement across social media posts related to each team. Tweets and Instagram posts with team hashtags and mentions contribute to the sentiment index, which is then converted into dynamic token values.",
    },
    {
      id: 6,
      question: "What can I win by participating?",
      answer:
        "By tweeting or posting your match predictions, you enter raffles for prizes like fan tokens, NFTs, club merchandise, and exclusive experiences. The more you engage, the higher your chance to win.",
    },
    {
      id: 7,
      question: "Is my data safe on Fanify?",
      answer:
        "Yes. We only access public content you've chosen to share and follow strict data privacy standards. Your personal data is encrypted and never sold or shared without consent.",
    },
    {
      id: 8,
      question: "How do prediction tokens fluctuate?",
      answer:
        "Tokens rise or fall in value based on the real-time sentiment of fans. For example, if a wave of positive posts about a team appears before the match, its token value increases — simulating a live market of fan expectations.",
    },
    {
      id: 9,
      question: "Why Chiliz Chain?",
      answer:
        "Chiliz is the leading blockchain for sports and fan tokens. It enables fast, low-cost transactions and gives users true digital ownership of their assets — ideal for a real-time fan engagement ecosystem.",
    },
    {
      id: 10,
      question: "How do I get started?",
      answer:
        "Post your match prediction on Twitter or Instagram with the right hashtags and tag @Chiliz. Your post will be tracked and counted toward your favorite team’s sentiment. You’ll automatically enter the raffle and start earning sentiment-based rewards.",
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