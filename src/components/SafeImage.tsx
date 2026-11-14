import React, { useState } from 'react';
import { CakeSlice } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle,
}) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#FCEEF1] via-[#FAF5F0] to-[#F3EAE0] text-[#6D5A5E] p-6 text-center ${className}`}
      >
        <CakeSlice className="w-8 h-8 text-[#C49A52] mb-2" strokeWidth={1.5} />
        <span className="font-display text-lg font-medium text-[#2D1F22] line-clamp-2">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
