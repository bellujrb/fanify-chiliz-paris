import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Instagram, Loader2, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface InstagramConnectGateProps {
  onConnected: () => void;
}

const InstagramConnectGate: React.FC<InstagramConnectGateProps> = ({ onConnected }) => {
  const [connectionStep, setConnectionStep] = useState<'select' | 'connecting' | 'success'>('select');

  const handleConnectInstagram = async () => {
    setConnectionStep('connecting');
    setTimeout(() => {
      setConnectionStep('success');
      setTimeout(() => {
        onConnected();
        setConnectionStep('select');
      }, 1500);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-8">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 text-center">
          {connectionStep === 'select' && (
            <>
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-600 to-red-600 rounded-full flex items-center justify-center">
                <Instagram className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent mb-4">
                Oops!
              </h2>
              <p className="text-gray-600 mb-6">
                To continue, you need to connect your Instagram account to access your fan wallet.
              </p>
              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white mb-4"
                onClick={handleConnectInstagram}
              >
                Connect Instagram
              </Button>
              <Link href="/">
                <Button 
                  variant="ghost" 
                  className="w-full text-gray-600 hover:text-gray-900"
                >
                  Return to Home
                </Button>
              </Link>
            </>
          )}

          {connectionStep === 'connecting' && (
            <>
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-600 to-red-600 rounded-full flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-white animate-spin" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Connecting...
              </h2>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl mb-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-700">Verifying account...</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    <span className="text-sm text-gray-700">Setting up tracking...</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                    <span className="text-sm text-gray-700">Synchronizing data...</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {connectionStep === 'success' && (
            <>
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Instagram Connected!
              </h2>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200/50 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Profile:</span>
                    <span className="text-sm font-medium text-gray-900">@userathlete</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    <span className="text-sm text-green-600 font-semibold">Connected</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstagramConnectGate; 