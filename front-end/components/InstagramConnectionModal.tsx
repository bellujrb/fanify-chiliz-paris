'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  Instagram, 
  Shield, 
  CheckCircle,
  Loader2,
  Users,
  BarChart3
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface InstagramConnectionModalProps {
  children: React.ReactNode;
  onConnect?: () => void;
}

const InstagramConnectionModal: React.FC<InstagramConnectionModalProps> = ({ children, onConnect }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStep, setConnectionStep] = useState<'select' | 'connecting' | 'success'>('select');
  const router = useRouter();

  const handleConnectInstagram = async () => {
    setIsConnecting(true);
    setConnectionStep('connecting');

    // Simulate connection process
    setTimeout(() => {
      setConnectionStep('success');
      setIsConnecting(false);
      // Call the onConnect callback to update parent component
      setTimeout(() => {
        if (onConnect) {
          onConnect();
        }
        // Redirect to admin dashboard
        router.push('/admin');
        resetModal();
      }, 1500);
    }, 2000);
  };

  const resetModal = () => {
    setConnectionStep('select');
    setIsConnecting(false);
  };

  const renderSelectInstagram = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
          <Instagram className="w-8 h-8 text-white" />
        </div>
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Connect Instagram
          </DialogTitle>
        </DialogHeader>
      </div>

      {/* Instagram Creator Notice */}
      <div className="bg-gradient-to-r from-pink-50 to-red-50 p-4 rounded-xl border border-pink-200/50">
        <div className="flex items-start space-x-3">
          <Users className="w-5 h-5 text-pink-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Creator Account Required</h4>
            <p className="text-sm text-gray-600">
              Make sure your Instagram account is in Creator mode 
              to access all features of the admin dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* Instagram Connect Button */}
      <div className="space-y-4">
        <Button
          onClick={handleConnectInstagram}
          className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold py-4 rounded-xl flex items-center justify-center space-x-3"
        >
          <Instagram className="w-5 h-5" />
          <span>Connect Instagram</span>
        </Button>
      </div>

      {/* Security Notice */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200/50">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Security</h4>
            <p className="text-sm text-gray-600">
              We only use public data from your profile to track 
              fan engagement. Your private information remains secure.
            </p>
          </div>
        </div>
      </div>

      {/* What we track */}
      <div className="bg-gray-50 p-4 rounded-xl">
        <div className="flex items-start space-x-3">
          <BarChart3 className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">What we track:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Comments on your posts</li>
              <li>• Mentions and hashtags related to your profile</li>
              <li>• Fan engagement with your content</li>
              <li>• Public reach metrics</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderConnecting = () => (
    <div className="space-y-6">
      {/* Header - Centralized */}
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">
            Connecting...
          </h2>
          <p className="text-gray-600">
            Wait while we connect your Instagram
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-pink-50 to-red-50 p-6 rounded-xl">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-700">Verifying Creator account...</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <span className="text-sm text-gray-700">Setting up tracking...</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            <span className="text-sm text-gray-700">Synchronizing data...</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="space-y-6 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Instagram Connected!
          </DialogTitle>
        </DialogHeader>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200/50">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Profile:</span>
            <span className="text-sm font-medium text-gray-900">@userathlete</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Followers:</span>
            <span className="text-sm text-gray-900">15.2K</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Creator Mode:</span>
            <span className="text-sm text-green-600 font-semibold">Active</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Status:</span>
            <span className="text-sm text-green-600 font-semibold">Connected</span>
          </div>
        </div>
      </div>

      <Button
        onClick={() => {
          router.push('/admin');
          resetModal();
        }}
        className="w-full bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white font-semibold py-3 rounded-xl"
      >
        Access Admin Dashboard
      </Button>
    </div>
  );

  const renderContent = () => {
    switch (connectionStep) {
      case 'connecting':
        return renderConnecting();
      case 'success':
        return renderSuccess();
      default:
        return renderSelectInstagram();
    }
  };

  return (
    <Dialog onOpenChange={(open) => !open && resetModal()}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden">
        <div className="p-6">
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InstagramConnectionModal;