'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, X, Wallet, Settings, Users, Trophy, Copy, ExternalLink, RefreshCw, LogOut } from 'lucide-react';
import Link from 'next/link';
import WalletConnectionModal from './WalletConnectionModal';
import { useWallet } from '@/contexts/WalletContext';
import { useWalletBalance } from '@/hooks/useWalletBalance';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isConnected, address, disconnect } = useWallet();
  const { balance, isLoading: balanceLoading } = useWalletBalance();

  // Get wallet data from context
  const walletData = {
    address: address || '',
    balance: balanceLoading ? 'Loading...' : `${parseFloat(balance).toFixed(4)} CHZ`,
    shortAddress: address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ''
  };

  const navigationItems = [
    {
      title: "Ecosystem",
      description: "Boosting club-fan relationships through social sentiment and blockchain",
      items: [
        {
          title: "For Clubs",
          href: "/clubs",
          description: "Activate your fanbase, track sentiment and increase token engagement",
          icon: Trophy,
        },
        {
          title: "For Fans",
          href: "/fans",
          description: "Turn your posts into rewards and trade hype-driven tokens",
          icon: Users,
        },
      ],
    },
    {
      title: "About",
      href: "/about",
      description: "",
    },
  ];

  const handleWalletDisconnect = () => {
    disconnect();
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
    }
  };

  const WalletButton = () => {
    if (!isConnected) {
      return (
        <WalletConnectionModal>
          <Button
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
          >
            <Wallet className="w-4 h-4" />
            <span>Connect Wallet</span>
          </Button>
        </WalletConnectionModal>
      );
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center space-x-3 px-4 py-2 h-auto"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {walletData.shortAddress.slice(2, 4).toUpperCase()}
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold text-gray-900">{walletData.shortAddress}</span>
              <span className="text-xs text-gray-500">{walletData.balance}</span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="p-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">Connected Wallet</p>
            <p className="text-xs text-gray-500 mt-1">{walletData.shortAddress}</p>
          </div>
          
          <DropdownMenuItem onClick={copyAddress} className="cursor-pointer">
            <Copy className="w-4 h-4 mr-2" />
            Copy Address
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild>
            <Link href="/wallet" className="cursor-pointer">
              <Wallet className="w-4 h-4 mr-2" />
              My Wallet
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem asChild>
            <Link href="/settings" className="cursor-pointer">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={handleWalletDisconnect} className="cursor-pointer text-red-600">
            <LogOut className="w-4 h-4 mr-2" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <header className="w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent">
                Fanify.
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-6">
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    {item.href ? (
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
                        >
                          {item.title}
                        </Link>
                      </NavigationMenuLink>
                    ) : (
                      <>
                        <NavigationMenuTrigger className="text-gray-600 hover:text-gray-900 font-medium">
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="!w-[400px] p-6">
                          <div className="space-y-4">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {item.title}
                              </h3>
                              <p className="text-sm text-gray-600 mb-4">
                                {item.description}
                              </p>
                            </div>
                            <div className="grid gap-3">
                              {item.items?.map((subItem) => (
                                <NavigationMenuLink key={subItem.title} asChild>
                                  <Link
                                    href={subItem.href}
                                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                                  >
                                    <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-red-100 rounded-lg flex items-center justify-center group-hover:from-purple-200 group-hover:to-red-200 transition-colors">
                                      <subItem.icon className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-gray-900 mb-1">
                                        {subItem.title}
                                      </h4>
                                      <p className="text-sm text-gray-600">
                                        {subItem.description}
                                      </p>
                                    </div>
                                  </Link>
                                </NavigationMenuLink>
                              ))}
                            </div>
                          </div>
                        </NavigationMenuContent>
                      </>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <WalletButton />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
              {navigationItems.map((item) => (
                <div key={item.title} className="space-y-2">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="block px-3 py-2 text-gray-600 hover:text-gray-900 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <>
                      <div className="px-3 py-2">
                        <p className="font-medium text-gray-900 mb-2">{item.title}</p>
                        <div className="space-y-2 ml-4">
                          {item.items?.map((subItem) => (
                            <Link
                              key={subItem.title}
                              href={subItem.href}
                              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 py-1"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <subItem.icon className="w-4 h-4" />
                              <span>{subItem.title}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}

              {/* Mobile Buttons */}
              <div className="px-3 py-4 space-y-3 border-t border-gray-100">
                <div className="w-full">
                  <WalletButton />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}