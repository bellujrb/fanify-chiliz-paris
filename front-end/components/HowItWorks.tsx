'use client';

import React, { useState } from 'react';
import { 
  Twitter, 
  Brain, 
  Zap, 
  Trophy, 
  Coins, 
  TrendingUp, 
  ArrowRight, 
  ArrowLeft, 
  BarChart3, 
  Target, 
  Award, 
  Timer, 
  Users, 
  Star,
  Wallet,
  ArrowUpDown,
  DollarSign,
  Play,
  CheckCircle
} from 'lucide-react';

const HowItWorks = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: "Official Activation",
      subtitle: "Game announcement triggers market creation and token staking",
      icon: Twitter,
      content: {
        features: [
          {
            icon: Twitter,
            title: "Official Tweet & Market Launch",
            description: "Market launches with official hashtag and synthetic tokens"
          },
          {
            icon: Coins,
            title: "Token Creation",
            description: "System creates synthetic Hype tokens ready for distribution at market launch"
          }
        ],
        visual: "activation"
      }
    },
    {
      id: 2,
      title: "Social Sentiment Analysis",
      subtitle: "AI analyzes Twitter sentiment in real-time",
      icon: Brain,
      content: {
        features: [
          {
            icon: Twitter,
            title: "Tweet Collection",
            description: "Continuous monitoring of official hashtag tweets"
          },
          {
            icon: Brain,
            title: "NLP Classification",
            description: "AI classifies sentiment: pro-Team A, pro-Team B, neutral, negative"
          },
          {
            icon: BarChart3,
            title: "Weighted Scoring",
            description: "Engagement metrics determine tweet influence weight"
          }
        ],
        visual: "sentiment"
      }
    },
    {
      id: 3,
      title: "Hype Score Calculation",
      subtitle: "Real-time hype percentage drives token dynamics",
      icon: TrendingUp,
      content: {
        features: [
          {
            icon: TrendingUp,
            title: "Live Hype Tracking",
            description: "Weighted sentiment converted to team hype percentages"
          },
          {
            icon: Zap,
            title: "Oracle Updates",
            description: "On-chain oracle receives real-time hype and game data"
          },
          {
            icon: Target,
            title: "Dynamic Pricing",
            description: "Token prices and position values update dynamically during the match"
          }
        ],
        visual: "hype"
      }
    },
    {
      id: 4,
      title: "Stake & Position Management",
      subtitle: "Users connect wallets, stake tokens, and manage positions before and during the match",
      icon: Wallet,
      content: {
        features: [
          {
            icon: Wallet,
            title: "Wallet Connection & Token Staking",
            description: "Users connect wallets and stake Chiliz or team tokens to receive Hype tokens before the match"
          },
          {
            icon: Timer,
            title: "Position Control Before and During Match",
            description: "Users can open positions before the match starts and can open, adjust or close positions multiple times during the match"
          },
          {
            icon: ArrowUpDown,
            title: "Dynamic Position Adjustment",
            description: "Positions can be adjusted or closed at any time during the match to realize profits or minimize losses"
          },
          {
            icon: DollarSign,
            title: "Manual Settlement",
            description: "After the match, users must manually claim tokens and unlock staked assets"
          }
        ],
        visual: "management"
      }
    },
    {
      id: 5,
      title: "Dynamic Token Economics",
      subtitle: "Game events trigger automatic burn/mint and settlement",
      icon: Coins,
      content: {
        features: [
          {
            icon: Trophy,
            title: "Goal Events",
            description: "Goals scored trigger token burn; goals conceded trigger minting"
          },
          {
            icon: Timer,
            title: "Final Result Settlement",
            description: "Winners receive token rewards; losers mint tokens as penalty"
          },
          {
            icon: Coins,
            title: "Position Settlement",
            description: "Positions are settled based on the final game outcome"
          }
        ],
        visual: "economics"
      }
    },
    {
      id: 6,
      title: "Engagement Ranking & Rewards",
      subtitle: "Twitter users with connected wallets earn CHZ and NFTs",
      icon: Award,
      content: {
        features: [
          {
            icon: Users,
            title: "Wallet Connection",
            description: "Link your Twitter account to your wallet to participate"
          },
          {
            icon: Star,
            title: "Engagement Tracking",
            description: "Quality tweets, retweets, and interactions are scored"
          },
          {
            icon: Trophy,
            title: "Monthly Rankings",
            description: "Top contributors receive CHZ tokens and exclusive NFTs"
          }
        ],
        visual: "ranking"
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
      case "activation":
        return (
          <div className="space-y-6">
            {/* Market Launch Card */}
            <div className="bg-gradient-to-br from-brand-500 to-brand-600 rounded-3xl p-8 text-white shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                    <Twitter className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold">Market Launch</div>
                    <div className="text-sm opacity-90">#PSGxBOT</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm opacity-90">Status</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-brand-600/30 rounded-full px-2 py-1">Live</span>
                    <div className="w-3 h-3 bg-brand-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-brand-50 to-pink-50 rounded-xl border-l-4 border-brand-500">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-brand-500 to-brand-600 rounded-lg flex items-center justify-center">
                      <Coins className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-brand-600">PRO-PSG</div>
                      <div className="text-sm text-gray-600">Hype Token</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-brand-600">0.085</div>
                    <div className="text-sm text-gray-600">Initial Price</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold">2,450</div>
                    <div className="text-sm opacity-90">Total Staked</div>
                    <span className="text-brand-400">345 votes</span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold">1,890</div>
                    <div className="text-sm opacity-90">Total Staked</div>
                    <span className="text-brand-400">23 votes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "sentiment":
        return (
          <div className="space-y-6">
            {/* Sentiment Analysis Dashboard */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-bold text-gray-900">Real-time Sentiment</h4>
                <TrendingUp className="w-6 h-6 mr-2 text-brand-600" />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-brand-50 to-pink-50 rounded-xl border border-brand-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                      <Brain className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">PSG Sentiment</div>
                      <div className="text-sm text-gray-600">Positive tweets</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-brand-600">40.3%</div>
                    <div className="text-sm text-gray-600">Hype Score</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>PSG Hype</span>
                    <span className="font-bold">40.3%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-brand-500 to-brand-600 h-3 rounded-full" style={{width: '40.3%'}}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>BOT Hype</span>
                    <span className="font-bold">59.7%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full" style={{width: '59.7%'}}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Data Feed */}
            <div className="bg-gray-900 rounded-2xl p-4 text-green-400 font-mono text-xs">
              <div className="space-y-1">
                <div><span className="text-brand-400">"market"</span>: <span className="text-green-400">"PSGxBOT_20250620"</span>,</div>
                <div><span className="text-brand-400">"hypeScores"</span>: {`{`}</div>
                <div className="ml-4"><span className="text-brand-400">"PSG"</span>: <span className="text-yellow-400">403</span>,</div>
                <div className="ml-4"><span className="text-blue-400">"BOT"</span>: <span className="text-yellow-400">597</span></div>
                <div>{`}`},</div>
                <div><span className="text-brand-400">"gameData"</span>: {`{`}</div>
                <div className="ml-4"><span className="text-brand-400">"score"</span>: <span className="text-green-400">"0-0"</span>,</div>
                <div className="ml-4"><span className="text-brand-400">"minute"</span>: <span className="text-yellow-400">0</span>,</div>
                <div className="ml-4"><span className="text-brand-400">"status"</span>: <span className="text-blue-400">"pre-match"</span></div>
                <div>{`}`}</div>
              </div>
            </div>
          </div>
        );

      case "hype":
        return (
          <div className="space-y-6">
            {/* Live Hype Display */}
            <div className="bg-gradient-to-r from-brand-50 to-pink-50 p-4 rounded-xl border border-brand-200">
              <div className="flex items-center space-x-3 mb-4">
                <Wallet className="w-6 h-6 text-brand-600" />
                <div>
                  <div className="font-bold text-gray-900">Live Hype Tracker</div>
                  <div className="text-sm text-gray-600">Real-time updates</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-brand-600">40.3%</div>
                  <div className="text-sm text-gray-600">PSG Hype</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">59.7%</div>
                  <div className="text-sm text-gray-600">BOT Hype</div>
                </div>
              </div>
            </div>

            {/* Token Price Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-4">Token Price Evolution</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">PSG_HYPE</span>
                  <span className="font-bold text-brand-600">$0.085</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-brand-500 h-2 rounded-full" style={{width: '40%'}}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">BOT_HYPE</span>
                  <span className="font-bold text-blue-600">$0.125</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '60%'}}></div>
                </div>
              </div>
            </div>
          </div>
        );

      case "management":
        return (
          <div className="space-y-6">
            {/* Wallet Connection */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <Wallet className="w-6 h-6 text-brand-600" />
                <div>
                  <div className="font-bold text-gray-900">Wallet Connected</div>
                  <div className="text-sm text-gray-600">0x1234...5678</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">CHZ Balance</span>
                  <span className="font-bold">1,250.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Staked Amount</span>
                  <span className="font-bold text-brand-600">500.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">HYPE Tokens</span>
                  <span className="font-bold">2,450</span>
                </div>
              </div>
            </div>

            {/* Position Management */}
            <div className="bg-gradient-to-r from-brand-50 to-pink-50 p-4 rounded-xl border border-brand-200">
              <h4 className="font-bold text-gray-900 mb-4">Active Positions</h4>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold text-gray-900">PSG Position</div>
                      <div className="text-sm text-gray-600">Long • 1,200 HYPE</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-green-600">+12.5%</div>
                      <div className="text-xs text-gray-600">P&L</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "economics":
        return (
          <div className="space-y-6">
            {/* Game Events */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-4">Live Game Events</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-900">PSG Scores! (45')</div>
                    <div className="text-xs text-gray-600">Token burn triggered</div>
                  </div>
                  <div className="text-xs mt-1 bg-brand-100 text-brand-600 px-2 py-1 rounded">Burn PSG_HYPE</div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-900">BOT Scores! (67')</div>
                    <div className="text-xs text-gray-600">Token burn triggered</div>
                  </div>
                  <div className="text-xs mt-1 bg-brand-100 text-brand-600 px-2 py-1 rounded">Burn BOT_HYPE</div>
                </div>
              </div>
            </div>

            {/* Final Settlement */}
            <div className="bg-brand-50 p-4 rounded-xl text-center border border-brand-200">
              <div className="w-12 h-12 bg-brand-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div className="font-bold text-brand-600">BOT Loses</div>
              <div className="text-sm text-gray-600 mb-2">Final Score: 1-2</div>
              <div className="text-xs bg-brand-100 text-brand-600 px-2 py-1 rounded">Mint penalty tokens</div>
            </div>
          </div>
        );

      case "ranking":
        return (
          <div className="space-y-6">
            {/* Leaderboard */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-4">Top Contributors</h4>
              <div className="space-y-3">
                {[
                  { user: "@psg_fanatic", wallet: "0x1234...5678", tweets: 45, engagement: "2.3K", score: 12500, reward: "50 CHZ" },
                  { user: "@bot_supporter", wallet: "0x8765...4321", tweets: 38, engagement: "1.8K", score: 9800, reward: "30 CHZ" },
                  { user: "@crypto_sports", wallet: "0xabcd...efgh", tweets: 52, engagement: "3.1K", score: 15200, reward: "75 CHZ" }
                ].map((user, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-brand-50 rounded-xl border border-brand-100">
                    <div className="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-bold text-gray-900">{user.user}</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="text-xs text-gray-600 font-mono">{user.wallet}</div>
                      <div className="flex items-center space-x-4 mt-2 text-xs">
                        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">{user.tweets} tweets</span>
                        <span className="bg-green-100 text-green-600 px-2 py-1 rounded">{user.engagement}</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold bg-gradient-to-r from-brand-600 to-brand-600 bg-clip-text text-transparent">
                        {user.score.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 mb-2">engagement pts</div>
                      <div className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                        {user.reward}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Engagement Metrics */}
            <div className="bg-gradient-to-r from-brand-600 to-brand-600 p-4 rounded-2xl text-white">
              <h5 className="font-bold mb-3 flex items-center">
                <Star className="w-5 h-5 mr-2" />
                Scoring System
              </h5>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Quality Tweet:</span>
                    <span className="font-bold">+50 pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Retweet:</span>
                    <span className="font-bold">+25 pts</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Viral Tweet (1K+ likes):</span>
                    <span className="font-bold">+200 pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wallet Connected:</span>
                    <span className="font-bold">+100 pts</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 bg-white/20 rounded-lg p-3 text-center">
                <div className="text-sm font-medium">Monthly Rewards Pool</div>
                <div className="text-2xl font-bold">500 CHZ + Exclusive NFTs</div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="relative py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-brand-50 border border-brand-200 rounded-full mb-8">
            <TrendingUp className="w-4 h-4 mr-2 text-brand-600" />
            <span className="text-brand-600 text-sm font-semibold">HOW IT WORKS</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            From Social Sentiment to <span className="text-brand-500">Real Rewards</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Discover how Fanify transforms sports hype into tradeable tokens through 
            AI sentiment analysis, dynamic staking, and blockchain economics
          </p>
        </div>

        {/* Step Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-2 bg-white rounded-2xl p-2 shadow-lg border border-gray-100 overflow-x-auto">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <button
                  key={step.id}
                  onClick={() => goToStep(index)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 whitespace-nowrap ${
                    currentStep === index
                      ? 'bg-brand-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-brand-600'
                  }`}
                >
                  <StepIcon className="w-4 h-4" />
                  <span className="font-semibold hidden sm:block text-sm">{step.id}</span>
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
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-brand-50 hover:text-brand-600 transition-all duration-200 hover:scale-110"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextStep}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-20 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-brand-50 hover:text-brand-600 transition-all duration-200 hover:scale-110"
          >
            <ArrowRight className="w-6 h-6" />
          </button>

          {/* Step Content */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0 min-h-[600px]">
              {/* Left Side - Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="space-y-8">
                  {/* Step Header */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-brand-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                        {React.createElement(steps[currentStep].icon, { className: "w-8 h-8" })}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-brand-600 mb-1">
                          STEP {steps[currentStep].id}
                        </div>
                        <h3 className="text-3xl font-black text-gray-900">
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
                          <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center mt-1 flex-shrink-0">
                            <FeatureIcon className="w-5 h-5 text-brand-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 mb-2">{feature.title}</h4>
                            <p className="text-gray-600">{feature.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Side - Visual */}
              <div className="bg-gray-50 p-8 lg:p-12 flex items-center justify-center">
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
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentStep === index ? 'bg-brand-500 w-8' : 'bg-gray-300 w-2'
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