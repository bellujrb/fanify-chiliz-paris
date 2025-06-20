'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Twitter, 
  Hash,
} from 'lucide-react';

interface Event {
  hashtag: string;
  homeTeam: { shortName: string; name: string };
  awayTeam: { shortName: string; name: string };
}

interface SocialEngagementProps {
  event: Event;
}

const SocialEngagement: React.FC<SocialEngagementProps> = ({ event }) => {
  const generateTweetUrl = (customText?: string) => {
    const text = customText || `🔥 ${event.homeTeam.shortName} vs ${event.awayTeam.shortName} is going to be EPIC! Who do you think will win? ${event.hashtag} #ChilizChain #FanTokens @Fanify`;
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  };

  const generateInstagramUrl = () => {
    return `https://www.instagram.com/`;
  };

  const tweetTemplates = [
    {
      id: 1,
      text: `🔥 ${event.homeTeam.shortName} vs ${event.awayTeam.shortName} is going to be EPIC! Who do you think will win? ${event.hashtag} #ChilizChain #FanTokens`,
      category: 'Prediction',
      points: '+15 pts'
    },
    {
      id: 2,
      text: `⚽ Game day! Supporting ${event.homeTeam.shortName} all the way! Let's see that hype token rise! 📈 ${event.hashtag} #FanTokens`,
      category: 'Support',
      points: '+10 pts'
    },
    {
      id: 3,
      text: `📊 Trading ${event.homeTeam.shortName} and ${event.awayTeam.shortName} hype tokens on @Fanify! The sentiment is through the roof! ${event.hashtag}`,
      category: 'Trading',
      points: '+20 pts'
    },
    {
      id: 4,
      text: `🚀 The hype for this match is INSANE! ${event.homeTeam.shortName} vs ${event.awayTeam.shortName} - who's ready? ${event.hashtag} #Blockchain #Sports`,
      category: 'Hype',
      points: '+12 pts'
    }
  ];

  const socialStats = [
    {
      platform: 'Twitter',
      icon: Twitter,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      mentions: '12.5K',
      engagement: '+45%',
      trending: '#3 Trending'
    },
  ];

  const topInfluencers = [
    {
      id: 1,
      username: '@SportsFanatic',
      followers: '125K',
      engagement: '2.5K',
      team: event.homeTeam.shortName,
      avatar: '🏆'
    },
    {
      id: 2,
      username: '@FootballKing',
      followers: '89K',
      engagement: '1.8K',
      team: event.awayTeam.shortName,
      avatar: '⚽'
    },
    {
      id: 3,
      username: '@HypeTrader',
      followers: '67K',
      engagement: '1.2K',
      team: event.homeTeam.shortName,
      avatar: '📈'
    },
    {
      id: 4,
      username: '@TokenMaster',
      followers: '54K',
      engagement: '980',
      team: event.awayTeam.shortName,
      avatar: '🚀'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Social Media Stats */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-6">Real-time Social Sentiment</h3>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {socialStats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.platform} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-10 h-10 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                    <IconComponent className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <h4 className="font-semibold text-gray-900">{stat.platform}</h4>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mentions</span>
                    <span className="font-semibold">{stat.mentions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Engagement</span>
                    <span className="font-semibold text-green-600">{stat.engagement}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    <span className="font-semibold text-purple-600">{stat.trending}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pre-made Tweet Templates */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-6">Ready-to-Share Content</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tweetTemplates.map((template) => (
            <div key={template.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
                  {template.category}
                </span>
                <span className="text-green-600 font-semibold text-sm">{template.points}</span>
              </div>
              
              <p className="text-gray-700 mb-4 leading-relaxed">{template.text}</p>
              
              <div className="flex space-x-2">
                <Button
                  onClick={() => window.open(generateTweetUrl(template.text), '_blank')}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <Twitter className="w-4 h-4 mr-2" />
                  Tweet
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigator.clipboard.writeText(template.text)}
                  className="px-3"
                >
                  Copy
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Official Hashtag Promotion */}
      <div className="bg-gradient-to-r from-purple-600 to-red-600 p-6 rounded-2xl text-white">
        <div className="flex items-center space-x-3 mb-4">
          <Hash className="w-6 h-6" />
          <h3 className="text-xl font-bold">Official Event Hashtag</h3>
        </div>
        
        <div className="bg-white/10 p-4 rounded-xl mb-4 backdrop-blur-sm">
          <div className="font-mono text-2xl font-bold mb-2">{event.hashtag}</div>
          <p className="text-white/90">
            Use this hashtag in your posts to participate in the hype economy and earn points!
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <Button
            onClick={() => window.open(generateTweetUrl(), '_blank')}
            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
          >
            <Twitter className="w-4 h-4 mr-2" />
            Share on Twitter
          </Button>
        </div>
      </div>

      
      </div>
  );
};

export default SocialEngagement;