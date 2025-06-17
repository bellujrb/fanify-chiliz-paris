'use client';

import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-red-400 to-pink-400 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-20 blur-xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm font-medium">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              LIVE
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <div className="text-gray-900">The new generation</div>
                <div className="text-gray-900">of sports</div>
                <div className="text-gray-900">engagement with</div>
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Blockchain
                </div>
                <div className="bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
                  and Instagram
                </div>
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
              Fanify connects athletes to their true fans through Instagram, 
              using Chiliz blockchain technology — the global leader in fan tokens.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch pitch
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300"
              >
                Documentation
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div>
                <div className="text-3xl font-bold text-gray-900">150+</div>
                <div className="text-sm text-gray-600">Sports Partners</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">2M+</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">$1B+</div>
                <div className="text-sm text-gray-600">Market Cap</div>
              </div>
            </div>
          </div>

          {/* Right Visual - Large Athlete Image */}
          <div className="relative">
            <div className="relative w-full h-[600px] lg:h-[700px]">
              {/* Background Gradient Shapes */}
              <div className="absolute inset-0">
                {/* Large red gradient blob */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-400/40 to-red-500 opacity-15 rounded-full transform translate-x-20 -translate-y-12 animate-pulse"></div>
                
                {/* Red gradient blob */}
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-red-400/40 to-red-500/60 rounded-full opacity-10 transform -translate-x-16 translate-y-16 animate-pulse"></div>
                
                {/* Additional gradient shapes */}
                <div className="absolute top-32 left-16 w-48 h-48 bg-gradient-to-br from-red-400/30 to-red-500/40 rounded-full opacity-8 animate-pulse"></div>
              </div>

              {/* Large Athlete Image */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="relative">
                  <Image 
                    src="/girl.png"
                    alt="Female Athlete with Headphones"
                    width={600}
                    height={800}
                    className="w-full h-auto max-w-lg lg:max-w-xl xl:max-w-2xl object-contain drop-shadow-2xl"
                    priority
                  />
                  
                  {/* Subtle glow effect behind the image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-red-500/5 rounded-full blur-3xl -z-10 scale-125"></div>
                </div>
              </div>

              {/* Floating Social Media Elements */}
              <div className="absolute top-20 right-8 w-16 h-16 bg-red-500 rounded-2xl transform rotate-12 animate-bounce shadow-lg z-20 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              
              <div className="absolute bottom-24 left-8 w-14 h-14 bg-red-500/90 rounded-xl animate-pulse shadow-lg z-20 flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </div>
              
              <div className="absolute top-40 left-12 w-12 h-12 bg-red-500/80 rounded-lg transform -rotate-12 animate-bounce shadow-lg z-20 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </div>
              
              <div className="absolute bottom-32 right-16 w-16 h-16 bg-red-500 rounded-2xl transform rotate-45 animate-pulse shadow-lg z-20 flex items-center justify-center">
                <span className="text-white text-2xl transform -rotate-45">🎵</span>
              </div>

              {/* Web3 & Blockchain Elements */}
              <div className="absolute top-32 right-20 w-12 h-12 bg-gradient-to-r from-red-500 to-red-500/80 rounded-full animate-bounce shadow-lg z-20 flex items-center justify-center">
                <span className="text-white text-xs font-bold">$CHZ</span>
              </div>

              <div className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-r from-red-500/80 to-red-500 rounded-lg transform rotate-12 animate-pulse shadow-lg z-20 flex items-center justify-center">
                <span className="text-white text-sm">🏃‍♀️</span>
              </div>

              {/* Subtle Decorative Rings */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] border border-red-500/20 rounded-full animate-spin opacity-10" style={{animationDuration: '20s'}}></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] border border-red-500/20 rounded-full opacity-8" style={{animationDuration: '15s', animationDirection: 'reverse'}}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}