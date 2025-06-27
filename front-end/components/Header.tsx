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
import { Menu, X, Wallet, Settings, Users, Trophy, Copy, ExternalLink, RefreshCw, LogOut, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import ChilizLogo from './ChilizLogo';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <header className="w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <span className="text-2xl font-black text-gray-900">
                Fanify
              </span>
              <div className="text-xs text-gray-500 font-medium">
                by Chiliz
              </div>
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
                                    <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center group-hover:bg-brand-100 transition-colors">
                                      <subItem.icon className="w-5 h-5 text-brand-600" />
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

          {/* Launch App Button */}
          <div className="flex items-center space-x-4">
            <Link href="/trading">
              <Button className="bg-brand-500 hover:bg-brand-600 text-white border-0 font-semibold px-6 py-2 rounded-xl transition-all duration-300">
                Launch App
              </Button>
            </Link>
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
            </div>
          </div>
        )}
      </div>
    </header>
  );
}