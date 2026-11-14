import React from 'react';

interface BrandLogoProps {
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = '' }) => {
  return (
    <span className={`inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 ${className}`}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="16" cy="16" r="14.5" stroke="#C49A52" strokeWidth="1.25" />
        <path
          d="M9.5 19.5C9.5 15.3579 12.4101 12 16 12C19.5899 12 22.5 15.3579 22.5 19.5H9.5Z"
          fill="#FCEEF1"
          stroke="#B84A66"
          strokeWidth="1.25"
        />
        <path
          d="M7.5 21.5H24.5"
          stroke="#C49A52"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <circle cx="16" cy="9.5" r="1.5" fill="#C49A52" />
      </svg>
      <span className="font-display text-2xl font-semibold tracking-tight text-[#2D1F22]">
        Dulce Encanto
      </span>
    </span>
  );
};
