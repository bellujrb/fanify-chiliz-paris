'use client';

import React from 'react';
import { 
  Gamepad2,
  Shield} from 'lucide-react';

interface AdminNavigationTabsProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

const AdminNavigationTabs: React.FC<AdminNavigationTabsProps> = ({
  activeSection,
  onSectionChange
}) => {
  const navigationSections = [
    {
      id: 'games',
      label: 'Match',
      icon: Gamepad2,
      color: 'text-red-600',
    },
    {
      id: 'system',
      label: 'System',
      icon: Shield,
      color: 'text-blue-600',
    }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center space-x-1 bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
        {navigationSections.map((section) => {
          const IconComponent = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 flex-1 justify-center ${
                activeSection === section.id
                  ? 'bg-red-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-red-600'
              }`}
            >
              <IconComponent className="w-5 h-5" />
              <span className="font-semibold text-sm">{section.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AdminNavigationTabs; 