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
  DollarSign
} from 'lucide-react';

const HowItWorks = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 1,
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
      id: 2,
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
            title: "Token Creation & Staking",
            description: "Users stake Chiliz or team tokens and receive Hype tokens to start participation"
          }
        ],
        visual: "activation"
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
          <div className="bg-gradient-to-br from-purple-600 to-red-600 rounded-3xl p-8 text-white shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h4 className="text-2xl font-bold">Market Launch</h4>
              <Twitter className="w-8 h-8" />
            </div>
            
            <div className="space-y-6">
              <div className="bg-white/10 rounded-2xl p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">@</span>
                  </div>
                  <span className="font-medium">Official Tweet</span>
                </div>
                <div className="text-sm opacity-90 bg-white/5 rounded-lg p-3 mt-3">
                  The game's hype market is live! 🔥 Use #Chiliz_PSGxBOT_20250620
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-lg font-bold mb-1">PSG_HYPE</div>
                  <div className="text-sm opacity-90">Token Created</div>
                  <div className="text-xs mt-2 bg-green-500/20 rounded-full px-2 py-1">Active</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-lg font-bold mb-1">BOT_HYPE</div>
                  <div className="text-sm opacity-90">Token Created</div>
                  <div className="text-xs mt-2 bg-green-500/20 rounded-full px-2 py-1">Active</div>
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Market ID</span>
                  <span className="text-xs bg-red-500/30 rounded-full px-2 py-1">Live</span>
                </div>
                <div className="font-mono text-sm">PSGxBOT_20250620</div>
              </div>
            </div>
          </div>
        );

      case "management":
        return (
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-purple-500/20">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-bold text-gray-900">Stake & Trade Interface</h4>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Connected</span>
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Wallet Connection */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200/50">
                <div className="flex items-center space-x-3 mb-3">
                  <Wallet className="w-6 h-6 text-purple-600" />
                  <span className="font-medium text-gray-900">Wallet Connected</span>
                </div>
                <div className="text-sm text-gray-600 font-mono">0x5b79...9ee9</div>
                <div className="text-sm text-gray-600 mt-1">Balance: 1,250 CHZ</div>
              </div>

              {/* Staking Interface */}
              <div className="border border-gray-200 rounded-xl p-4">
                <h5 className="font-semibold text-gray-900 mb-4">Stake CHZ → Get HYPE Tokens</h5>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Stake Amount</span>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="text" 
                        placeholder="100" 
                        className="w-16 text-right bg-transparent border-none outline-none font-semibold"
                      />
                      <span className="text-sm text-gray-600">CHZ</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <ArrowUpDown className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-sm text-gray-600">Receive</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">100</span>
                      <span className="text-sm text-gray-600">HYPE</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Position Management */}
              <div className="border border-gray-200 rounded-xl p-4">
                <h5 className="font-semibold text-gray-900 mb-4">Current Positions</h5>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">PSG Win</div>
                      <div className="text-sm text-gray-600">50 HYPE @ 1.4x</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">+15 HYPE</div>
                      <div className="text-xs text-gray-500">Current P&L</div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg text-sm font-medium">
                      Cash Out Early
                    </button>
                    <button className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium">
                      Hold Position
                    </button>
                  </div>
                </div>
              </div>

              {/* Time Restrictions */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Timer className="w-5 h-5 text-yellow-600" />
                  <span className="font-medium text-yellow-800">Time Restrictions</span>
                </div>
                <div className="text-sm text-yellow-700">
                  New positions close when match starts. Existing positions can be managed during the game.
                </div>
              </div>
            </div>
          </div>
        );

      case "sentiment":
        return (
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-purple-500/20">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-bold text-gray-900">AI Sentiment Analysis</h4>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border-l-4 border-red-500">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Twitter className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">PSG will dominate today!🔥</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-red-600">PRO-PSG</div>
                  <div className="text-xs text-gray-500">conf: 0.87</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-l-4 border-purple-500">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Botafogo will surprise!</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-purple-600">PRO-BOT</div>
                  <div className="text-xs text-gray-500">conf: 0.92</div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-gray-900 to-gray-800 p-4 rounded-2xl text-white">
              <h5 className="font-bold mb-3 flex items-center">
                <Brain className="w-5 h-5 mr-2" />
                NLP Classification
              </h5>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Pro-PSG:</span>
                    <span className="text-red-400">345 votes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pro-BOT:</span>
                    <span className="text-purple-400">512 votes</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Neutral:</span>
                    <span className="text-gray-400">89 votes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Negative:</span>
                    <span className="text-red-400">23 votes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "hype":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-purple-500/20">
              <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-purple-600" />
                Live Hype Score & Dynamic
              </h4>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">P</span>
                    </div>
                    <span className="font-medium">PSG</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-red-600">40.3%</div>
                    <div className="text-sm text-gray-500">1.8x</div>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full" style={{width: '40.3%'}}></div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">B</span>
                    </div>
                    <span className="font-medium">BOT</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-600">59.7%</div>
                    <div className="text-sm text-gray-500">1.4x</div>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full" style={{width: '59.7%'}}></div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl text-white font-mono text-sm">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="ml-2 text-gray-400">Oracle Real-time Data</span>
              </div>
              <div className="space-y-1 text-xs">
                <div><span className="text-red-400">"market"</span>: <span className="text-green-400">"PSGxBOT_20250620"</span>,</div>
                <div><span className="text-red-400">"hypeScores"</span>: {`{`}</div>
                <div className="ml-4"><span className="text-red-400">"PSG"</span>: <span className="text-yellow-400">403</span>,</div>
                <div className="ml-4"><span className="text-purple-400">"BOT"</span>: <span className="text-yellow-400">597</span></div>
                <div>{`}`},</div>
                <div><span className="text-red-400">"gameData"</span>: {`{`}</div>
                <div className="ml-4"><span className="text-red-400">"score"</span>: <span className="text-green-400">"0-0"</span>,</div>
                <div className="ml-4"><span className="text-red-400">"minute"</span>: <span className="text-yellow-400">0</span>,</div>
                <div className="ml-4"><span className="text-red-400">"status"</span>: <span className="text-blue-400">"pre-match"</span></div>
                <div>{`}`}</div>
              </div>
            </div>
          </div>
        );

      case "economics":
        return (
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-purple-500/20">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-bold text-gray-900">Dynamic Token Economics</h4>
              <div className="text-sm text-gray-600 bg-green-100 px-3 py-1 rounded-full">Live Game</div>
            </div>
            
            <div className="space-y-6">
              {/* Game Events */}
              <div className="bg-gradient-to-r from-green-50 to-pink-50 p-4 rounded-xl border border-green-200">
                <h5 className="font-bold text-gray-900 mb-3 flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-green-600" />
                  Game Events Impact
                </h5>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">PSG 2</div>
                    <div className="text-sm text-gray-600">Goals Scored</div>
                    <div className="text-xs mt-1 bg-red-100 text-red-600 px-2 py-1 rounded">Burn PSG_HYPE</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">BOT 1</div>
                    <div className="text-sm text-gray-600">Goals Scored</div>
                    <div className="text-xs mt-1 bg-red-100 text-red-600 px-2 py-1 rounded">Burn BOT_HYPE</div>
                  </div>
                </div>
              </div>

              {/* Position Settlement */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-xl text-center border border-green-200">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-bold text-green-600">PSG Wins</div>
                  <div className="text-sm text-gray-600 my-2">Position Settlement</div>
                  <div className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">Winners get rewards</div>
                </div>
                
                <div className="bg-red-50 p-4 rounded-xl text-center border border-red-200">
                  <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Coins className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-bold text-red-600">BOT Loses</div>
                  <div className="text-sm text-gray-600 my-2">Token Penalty</div>
                  <div className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">Mint penalty tokens</div>
                </div>
              </div>

              {/* Manual Settlement */}
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-2xl text-white">
                <h5 className="font-bold mb-3 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Manual Settlement Required
                </h5>
                <div className="text-sm mb-3">
                  After match ends, users must manually claim their rewards and unlock staked tokens.
                </div>
                <div className="bg-white/20 rounded-lg p-3 text-center">
                  <button className="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold text-sm">
                    Claim Rewards & Unlock Stake
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "ranking":
        return (
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-purple-500/20">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-bold text-gray-900">Engagement Leaderboard</h4>
              <div className="text-sm text-gray-600 bg-blue-100 px-3 py-1 rounded-full">Monthly Reset</div>
            </div>
            
            <div className="space-y-4 mb-6">
              {[
                { 
                  rank: 1, 
                  user: "@cryptofan_psg", 
                  wallet: "0x1a2b...3c4d", 
                  score: 2847, 
                  tweets: 23, 
                  engagement: "High",
                  color: "from-yellow-400 to-yellow-600",
                  reward: "50 CHZ + PSG NFT"
                },
                { 
                  rank: 2, 
                  user: "@botafogo_lover", 
                  wallet: "0x5e6f...7g8h", 
                  score: 2156, 
                  tweets: 18, 
                  engagement: "High",
                  color: "from-gray-300 to-gray-500",
                  reward: "30 CHZ"
                },
                { 
                  rank: 3, 
                  user: "@sports_analyst", 
                  wallet: "0x9i0j...1k2l", 
                  score: 1923, 
                  tweets: 15, 
                  engagement: "Medium",
                  color: "from-orange-400 to-orange-600",
                  reward: "20 CHZ"
                }
              ].map((user, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-purple-50 rounded-xl border border-purple-100">
                  <div className={`w-10 h-10 bg-gradient-to-r ${user.color} rounded-full flex items-center justify-center text-white font-bold`}>
                    {user.rank}
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
                    <div className="text-lg font-bold bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent">
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

            {/* Engagement Metrics */}
            <div className="bg-gradient-to-r from-purple-600 to-red-600 p-4 rounded-2xl text-white">
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
                <div className="text-2xl font-bold">200 CHZ + Exclusive NFTs</div>
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
            <TrendingUp className="w-4 h-4 mr-2" />
            Hype Token Market
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-8">
            From social sentiment to{' '}
            <span className="bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent">real rewards</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Discover how Fanify transforms sports hype into tradeable tokens through 
            AI sentiment analysis, dynamic staking, and blockchain economics
          </p>
        </div>

        {/* Step Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4 bg-white rounded-2xl p-2 shadow-lg border border-purple-500/20 overflow-x-auto">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <button
                  key={step.id}
                  onClick={() => goToStep(index)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 whitespace-nowrap ${
                    currentStep === index
                      ? 'bg-gradient-to-r from-purple-600 to-red-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gradient-to-r hover:from-pink-50 hover:to-red-50 hover:text-purple-600'
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
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 bg-white rounded-full shadow-lg border border-purple-500/20 flex items-center justify-center text-purple-600 hover:bg-gradient-to-r hover:from-pink-50 hover:to-red-50 transition-all duration-200 hover:scale-110"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextStep}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-20 w-12 h-12 bg-white rounded-full shadow-lg border border-purple-500/20 flex items-center justify-center text-purple-600 hover:bg-gradient-to-r hover:from-pink-50 hover:to-red-50 transition-all duration-200 hover:scale-110"
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
                          <div className="w-10 h-10 bg-gradient-to-r from-red-100 to-pink-100 rounded-xl flex items-center justify-center mt-1 flex-shrink-0">
                            <FeatureIcon className="w-5 h-5 text-red-600" />
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
              <div className="bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 p-8 lg:p-12 flex items-center justify-center">
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
                  currentStep === index ? 'bg-gradient-to-r from-purple-600 to-red-600 w-8' : 'bg-red-200'
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