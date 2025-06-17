'use client';

import React from 'react';
import { Instagram, Twitter, Youtube } from 'lucide-react';
import ChilizLogo from './ChilizLogo';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-red-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent">
                Fanify.
              </span>
            </div>
            <p className="text-gray-600 mb-6 max-w-md">
              The new generation of sports engagement with Web3 and Instagram. 
              Connect with your fans through Chiliz blockchain technology.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Ecosystem */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Ecosystem</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-red-500 transition-colors duration-200">
                  For Athletes
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-red-500 transition-colors duration-200">
                  For Fans
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-red-500 transition-colors duration-200">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-red-500 transition-colors duration-200">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-red-500 transition-colors duration-200">
                  Chiliz Chain
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-red-500 transition-colors duration-200">
                  Fanify Wallet
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-red-500/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600 text-sm mb-4 md:mb-0">
              © 2025 Fanify. All rights reserved.
            </div>
            
            {/* Powered by Chiliz */}
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Powered by</span>
              <ChilizLogo size="sm" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;