
import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ variant = 'light', size = 'md' }: LogoProps) => {
  const textColor = variant === 'light' ? 'text-white' : 'text-black';
  
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  };

  return (
    <div className={`flex items-center font-montserrat ${sizeClasses[size]}`}>
      <span className={`${textColor} font-medium`}>n</span>
      <span className="text-[#00ade0] font-bold">.</span>
      <span className={`${textColor} font-medium`}>Network</span>
    </div>
  );
};

export default Logo;
