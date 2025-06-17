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
import InstagramConnectionModal from './InstagramConnectionModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  // Mock wallet data - in real app this would come from wallet context/state
  const walletData = {
    address: '0x5b79b9311634e9b3cdafb07e1e3b7d69',
    balance: '0.0000 CHZ',
    shortAddress: '0x5b79...9ee9'
  };

  const navigationItems = [
    {
      title: "Ecosystem",
      description: "Connecting athletes and fans through blockchain technology",
      items: [
        {
          title: "For Athletes",
          href: "/athletes",
          description: "Monetize your content and connect with fans",
          icon: Trophy,
        },
        {
          title: "For Fans",
          href: "/fans",
          description: "Support your favorite athletes and earn rewards",
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

  const handleWalletConnect = () => {
    setIsWalletConnected(true);
  };

  const handleWalletDisconnect = () => {
    setIsWalletConnected(false);
  };

  const handleInstagramConnect = () => {
    // Handle Instagram connection logic here
    console.log('Instagram connected!');
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(walletData.address);
  };

  const WalletButton = () => {
    if (!isWalletConnected) {
      return (
        <WalletConnectionModal onConnect={handleWalletConnect}>
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
              5B
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold text-gray-900">{walletData.shortAddress}</span>
              <span className="text-xs text-gray-500">{walletData.balance}</span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80 p-0" align="end">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-red-600 rounded-full flex items-center justify-center text-white font-bold">
                5B
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Minha Carteira</h3>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Endereço</span>
                  <div className="flex items-center space-x-1">
                    <button 
                      onClick={copyAddress}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Copy className="w-3 h-3 text-gray-500" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <ExternalLink className="w-3 h-3 text-gray-500" />
                    </button>
                  </div>
                </div>
                <div className="text-xs font-mono text-gray-900 bg-gray-50 p-2 rounded">
                  {walletData.address}
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Saldo</span>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <RefreshCw className="w-3 h-3 text-gray-500" />
                  </button>
                </div>
                <div className="text-lg font-bold text-gray-900">
                  {walletData.balance}
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-2">
            <DropdownMenuItem className="text-gray-700 hover:bg-gray-50 cursor-pointer">
              <span>Minha Carteira</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={handleWalletDisconnect}
              className="text-red-600 hover:bg-red-50 cursor-pointer"
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span>Desconectar</span>
            </DropdownMenuItem>
          </div>
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
            <InstagramConnectionModal onConnect={handleInstagramConnect}>
              <Button className="bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Admin Panel</span>
              </Button>
            </InstagramConnectionModal>
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
                <InstagramConnectionModal onConnect={handleInstagramConnect}>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-red-600 text-white flex items-center justify-center space-x-2">
                    <Settings className="w-4 h-4" />
                    <span>Admin Panel</span>
                  </Button>
                </InstagramConnectionModal>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}