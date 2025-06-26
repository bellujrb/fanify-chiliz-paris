'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

const SystemSection: React.FC = () => {

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <Button className="bg-red-600 hover:bg-red-700 text-white text-2xl px-10 py-6 rounded-2xl shadow-lg font-bold animate-pulse">
        Emergency Withdraw
      </Button>
    </div>
  );
};

export default SystemSection; 