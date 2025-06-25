'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Gamepad2 } from 'lucide-react';

interface NavigationSection {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

interface ComingSoonSectionProps {
  section: NavigationSection;
  onBackToTrading: () => void;
}

const ComingSoonSection: React.FC<ComingSoonSectionProps> = ({
  section,
  onBackToTrading
}) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {section.label}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {section.description}
        </p>
      </div>
      
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          {React.createElement(section.icon || Gamepad2, {
            className: "w-8 h-8 text-gray-400"
          })}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Coming Soon</h3>
        <p className="text-gray-600 mb-6">
          This section is under development. Stay tuned for updates!
        </p>
        <Button 
          onClick={onBackToTrading}
          className="bg-red-500 hover:bg-red-600 text-white"
        >
          Back to Trading
        </Button>
      </div>
    </div>
  );
};

export default ComingSoonSection;