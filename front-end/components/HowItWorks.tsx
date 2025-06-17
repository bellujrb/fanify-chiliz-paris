'use client';

import React, { useState } from 'react';
import { Wallet, Instagram, Zap, Trophy, Gift, Users, ArrowRight, ArrowLeft, Smartphone, Globe, Award } from 'lucide-react';

const HowItWorks = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: "Connect your Wallet",
      subtitle: "First step to enter the ecosystem",
      icon: Wallet,
      content: {
        features: [
          {
            icon: Wallet,
            title: "Already have a wallet?",
            description: "Connect your existing wallet in seconds"
          },
          {
            icon: Smartphone,
            title: "First time?",
            description: "We create your Fanify Wallet instantly, no hassle"
          }
        ],
        visual: "wallet"
      }
    },
    {
      id: 2,
      title: "Smart Engagement",
      subtitle: "We collect Instagram data in real-time",
      icon: Instagram,
      content: {
        features: [
          {
            icon: Instagram,
            title: "Instagram API",
            description: "We collect engagement data in real-time"
          },
          {
            icon: Globe,
            title: "Blockchain Oracle",
            description: "We transfer data to blockchain securely"
          }
        ],
        visual: "engagement"
      }
    },
    {
      id: 3,
      title: "Smart Contracts",
      subtitle: "Intelligent automation of points and ranking",
      icon: Zap,
      content: {
        features: [
          {
            icon: Zap,
            title: "Points Distribution",
            description: "Automatic points based on engagement"
          },
          {
            icon: Trophy,
            title: "Level System",
            description: "Fans evolve according to engagement"
          },
          {
            icon: Award,
            title: "Monthly Ranking",
            description: "Healthy competition between fans"
          }
        ],
        visual: "contracts"
      }
    },
    {
      id: 4,
      title: "Monthly Rewards",
      subtitle: "Configure and distribute prizes to your fans",
      icon: Gift,
      content: {
        features: [
          {
            icon: Gift,
            title: "Monthly Reset",
            description: "Every month the ranking resets and competition restarts"
          },
          {
            icon: Trophy,
            title: "Ranking Distribution",
            description: "Athlete defines rewards for each position"
          }
        ],
        visual: "rewards"
      }
    }
  ];

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  const goToStep = (index: number) => {
    setCurrentStep(index);
  };

  const renderVisual = (visual: string) => {
    switch (visual) {
      case "wallet":
        return (
          <div className="bg-gradient-to-br from-purple-600 to-red-600 rounded-3xl p-8 text-white shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h4 className="text-2xl font-bold">Fanify Wallet</h4>
              <Wallet className="w-8 h-8" />
            </div>
            
            <div className="space-y-6">
              <div className="bg-white/10 rounded-2xl p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Instagram className="w-6 h-6" />
                  <span className="font-medium">Instagram Connected</span>
                </div>
                <div className="text-sm opacity-90">@yourathlete • 15.2K followers</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-sm opacity-90">Fan Tokens</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-sm opacity-90">NFTs</div>
                </div>
              </div>
            </div>
          </div>
        );

      case "engagement":
        return (
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-purple-500/20">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-bold text-gray-900">Real-time Data</h4>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Instagram className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">A fan posted about you… </div>
                    <div className="text-sm text-gray-600">and it WENT VIRAL!</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-purple-600">+127</div>
                  <div className="text-xs text-gray-500">likes</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-red-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Engagement</div>
                    <div className="text-sm text-gray-600">last 24h</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-red-500">+89%</div>
                  <div className="text-xs text-gray-500">growth</div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-purple-600 to-red-600 p-4 rounded-2xl text-white">
              <h5 className="font-bold mb-3">Monitored Metrics</h5>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>• Comments</div>
                <div>• Mentions</div>
                <div>• Hashtags/tags</div>
                <div>• returneach and engagement</div>
              </div>
            </div>
          </div>
        );

      case "contracts":
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl text-white font-mono text-sm">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="ml-2 text-gray-400">Smart Contract</span>
              </div>
              <div className="space-y-2">
                <div><span className="text-purple-400">function</span> <span className="text-blue-400">distributePoints</span>() {`{`}</div>
                <div className="ml-4"><span className="text-green-400">// Engagement → Points</span></div>
                <div className="ml-4"><span className="text-pink-400">updateRanking</span>();</div>
                <div>{`}`}</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xl border border-purple-500/20">
              <h4 className="text-lg font-bold text-gray-900 mb-4">Current Ranking</h4>
              
              <div className="space-y-3">
                {[
                  { pos: 1, name: "Ana Silva", points: 2847, level: "Dedicated Fan", color: "from-yellow-400 to-yellow-600" },
                  { pos: 2, name: "Carlos Lima", points: 2156, level: "Active Fan", color: "from-gray-300 to-gray-500" },
                  { pos: 3, name: "Maria Santos", points: 1923, level: "Active Fan", color: "from-orange-400 to-orange-600" }
                ].map((fan, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <div className={`w-6 h-6 bg-gradient-to-r ${fan.color} rounded-full flex items-center justify-center text-white font-bold text-xs`}>
                      {fan.pos}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm">{fan.name}</div>
                      <div className="text-xs text-gray-600">{fan.level}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent text-sm">{fan.points.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">pts</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "rewards":
        return (
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-purple-500/20">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-bold text-gray-900">Configure Rewards</h4>
              <div className="text-sm text-gray-600">Month: January</div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 border-2 border-purple-500/20 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <span className="font-medium text-gray-900">TOP 1%</span>
                  </div>
                  <button className="text-purple-600 text-sm font-medium">Edit</button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-lg text-center">
                    <div className="text-2xl mb-1">🎨</div>
                    <div className="text-sm font-medium">1 Exclusive NFT</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center">
                    <div className="text-2xl mb-1">🪙</div>
                    <div className="text-sm font-medium">5 Fan Tokens</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-gray-300 to-gray-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">5</span>
                    </div>
                    <span className="font-medium text-gray-900">TOP 5%</span>
                  </div>
                  <button className="text-purple-600 text-sm font-medium">Edit</button>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className="text-2xl mb-1">🪙</div>
                  <div className="text-sm font-medium">3 Fan Tokens</div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-purple-600 to-red-600 p-4 rounded-2xl text-white">
              <h5 className="font-bold mb-3">Configuration Example</h5>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>🥇 TOP 1%</span>
                  <span className="font-medium">1 NFT + 5 Fan Tokens</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>🥈 TOP 5%</span>
                  <span className="font-medium">3 Fan Tokens</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>🥉 TOP 10%</span>
                  <span className="font-medium">1 Fan Token</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-red-400 to-pink-400 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-20 blur-xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-red-600 text-white rounded-full text-sm font-medium shadow-lg mb-8">
            <Zap className="w-4 h-4 mr-2" />
            How It Works
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-8">
            From connection to{' '}
            <span className="bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent">reward</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Discover how Fanify transforms Instagram engagement into real rewards 
            through Chiliz blockchain technology
          </p>
        </div>

        {/* Step Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4 bg-white rounded-2xl p-2 shadow-lg border border-purple-500/20">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <button
                  key={step.id}
                  onClick={() => goToStep(index)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                    currentStep === index
                      ? 'bg-gradient-to-r from-purple-600 to-red-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600'
                  }`}
                >
                  <StepIcon className="w-5 h-5" />
                  <span className="font-medium hidden sm:block">{step.id}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevStep}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 bg-white rounded-full shadow-lg border border-purple-500/20 flex items-center justify-center text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200 hover:scale-110"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextStep}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-20 w-12 h-12 bg-white rounded-full shadow-lg border border-purple-500/20 flex items-center justify-center text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200 hover:scale-110"
          >
            <ArrowRight className="w-6 h-6" />
          </button>

          {/* Step Content */}
          <div className="bg-white rounded-3xl shadow-2xl border border-purple-500/20 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0 min-h-[600px]">
              {/* Left Side - Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="space-y-8">
                  {/* Step Header */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                        {React.createElement(steps[currentStep].icon, { className: "w-8 h-8" })}
                      </div>
                      <div>
                        <div className="text-sm font-medium bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent mb-1">
                          STEP {steps[currentStep].id}
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900">
                          {steps[currentStep].title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-lg text-gray-600">
                      {steps[currentStep].subtitle}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-6">
                    {steps[currentStep].content.features.map((feature, index) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mt-1 flex-shrink-0">
                            <FeatureIcon className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                            <p className="text-gray-600">{feature.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Side - Visual */}
              <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 p-8 lg:p-12 flex items-center justify-center">
                <div className="w-full max-w-md">
                  {renderVisual(steps[currentStep].content.visual)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentStep === index ? 'bg-gradient-to-r from-purple-600 to-red-600 w-8' : 'bg-purple-200'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;