'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Trophy, ArrowLeft } from 'lucide-react';

const LeaderboardSection: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Leaderboard
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Compete with traders worldwide and climb the rankings
        </p>
      </div>
      
      {/* Simple Development Notice */}
      <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-200 text-center max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-gradient-to-r from-brand-500 to-brand-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Trophy className="w-10 h-10 text-white" />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4">In Development</h3>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          The global ranking system is being developed and will be launched soon with amazing competition features.
        </p>

        <Button 
          onClick={() => window.location.href = '#trading'}
          className="bg-brand-500 hover:bg-brand-600 text-white font-semibold px-8 py-3 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Trading
        </Button>
      </div>
    </div>
  );
};

export default LeaderboardSection;