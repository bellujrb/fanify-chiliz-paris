'use client';

import React from 'react';
import { 
  Activity,
  Bot,
  Users,
  DollarSign,
  Server,
  Database,
  Shield,
  Wifi,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const SystemSection: React.FC = () => {
  const systemStatus = {
    online: true,
    activeBots: 3,
    activeUsers: 12500,
    totalVolume: 2100000,
    database: true,
    api: true,
    blockchain: true
  };

  const getStatusIcon = (status: boolean) => {
    if (status) {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
    return <AlertTriangle className="w-5 h-5 text-red-600" />;
  };

  const getStatusColor = (status: boolean) => {
    return status ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <Button className="bg-red-600 hover:bg-red-700 text-white text-2xl px-10 py-6 rounded-2xl shadow-lg font-bold animate-pulse">
        Emergency Withdraw
      </Button>
    </div>
  );
};

export default SystemSection; 