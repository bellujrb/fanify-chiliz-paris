'use client';

import React from 'react';
import { Instagram, Twitter, Youtube, Globe, Mail, MapPin } from 'lucide-react';
import ChilizLogo from './ChilizLogo';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <span className="text-3xl font-black text-white">
                Fanify
              </span>
              <div className="text-sm text-gray-400 font-medium ml-2">
                by Chiliz
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Fanify turns real fan sentiment into prediction tokens using the 
              power of Twitter and Chiliz — the global leader in fan tokens.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-red-500 hover:text-white transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-red-500 hover:text-white transition-all duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-red-500 hover:text-white transition-all duration-300"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-red-500 hover:text-white transition-all duration-300"
              >
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-bold text-white mb-6">Product</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-300 hover:text-red-400 transition-colors duration-200">
                  Fan Tokens
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-red-400 transition-colors duration-200">
                  NFT Marketplace
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-red-400 transition-colors duration-200">
                  Leaderboards
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-red-400 transition-colors duration-200">
                  Mobile App
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-white mb-6">Company</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-300 hover:text-red-400 transition-colors duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-red-400 transition-colors duration-200">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-red-400 transition-colors duration-200">
                  Press Kit
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-red-400 transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className="border-t border-gray-800 mt-12 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-black text-white mb-2">2.5B+</div>
              <div className="text-gray-400">Fans Active on Social Media</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-white mb-2">70%</div>
              <div className="text-gray-400">Want More Interactive Experiences</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-white mb-2">450M+</div>
              <div className="text-gray-400">Fan Token Market</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-white mb-2">1T+</div>
              <div className="text-gray-400">Any</div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Fanify. All rights reserved.
            </div>
            
            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm text-gray-400 mb-4 md:mb-0">
              <a href="#" className="hover:text-red-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-red-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-red-400 transition-colors">Cookie Policy</a>
            </div>
            
            {/* Powered by Chiliz */}
            <div className="flex items-center space-x-2 text-sm text-gray-400">
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