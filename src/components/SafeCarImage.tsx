import React, { useState } from 'react';
import { Car } from 'lucide-react';

interface SafeCarImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  aspectRatio?: '16/9' | '4/3' | '3/2';
  vehicleTitle?: string;
}

export const SafeCarImage: React.FC<SafeCarImageProps> = ({
  src,
  fallbackSrc,
  alt,
  className = '',
  aspectRatio = '4/3',
  vehicleTitle = 'I SALE AUTOS',
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
  };

  const aspectClass =
    aspectRatio === '16/9'
      ? 'aspect-[16/9]'
      : aspectRatio === '3/2'
      ? 'aspect-[3/2]'
      : 'aspect-[4/3]';

  if (hasError) {
    return (
      <div
        className={`w-full ${aspectClass} bg-gradient-to-br from-[#1C1F24] via-[#242830] to-[#121417] flex flex-col items-center justify-center p-6 text-center select-none relative overflow-hidden ${className}`}
      >
        {/* Subtle automotive contour lines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 400 250" fill="none" stroke="currentColor">
            <path d="M 40 180 C 80 170, 110 130, 160 120 C 220 110, 280 120, 320 150 C 350 170, 370 180, 390 180" strokeWidth="2" strokeDasharray="6 6" />
            <path d="M 20 200 L 380 200" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 mb-3 z-10">
          <Car className="w-6 h-6 text-zinc-300" />
        </div>
        <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-1 z-10">
          I SALE AUTOS SHOWCASE
        </span>
        <span className="text-sm font-medium text-white max-w-xs z-10 line-clamp-1">
          {vehicleTitle}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-zinc-900 ${aspectClass} ${className}`}>
      {/* Loading Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 animate-pulse" />
      )}
      <img
        src={currentSrc}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        className={`w-full h-full object-cover transition-all duration-500 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
      />
    </div>
  );
};
