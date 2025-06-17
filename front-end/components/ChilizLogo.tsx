'use client';

import React from 'react';
import Image from 'next/image';

interface ChilizLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ChilizLogo: React.FC<ChilizLogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-12'
  };

  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/full-chiliz-logo.png"
        alt="Chiliz"
        width={120}
        height={30}
        className={`${sizeClasses[size]} w-auto object-contain`}
        priority
      />
    </div>
  );
};

export default ChilizLogo;