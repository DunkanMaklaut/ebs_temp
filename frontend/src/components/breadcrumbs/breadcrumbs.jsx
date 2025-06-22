'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { lightTheme as colors } from "@resources/colors/colors";

const Breadcrumbs = ({ path }) => {
  const router = useRouter();

  const handleClick = (href) => {
    if (href) router.push(href);
  };

  return (
    <div
      className="w-full mb-6 flex flex-col lg:flex-row gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[14px] p-3 sm:p-2 overflow-hidden whitespace-nowrap"
      style={{ color: colors.secondaryText, backgroundColor: colors.secondaryBackground }}
    >
      <nav className="flex items-center space-x-1 overflow-hidden">
        {path.map((item, index) => (
          <span
            key={index}
            className={`flex items-center max-w-[200px] overflow-hidden ${index === 0 ? 'ml-4' : ''}`}
          >
            <button
              onClick={() => handleClick(item.href)}
              disabled={!item.href}
              title={item.label}
              className={`bg-transparent border-none cursor-pointer text-[14px] truncate text-current
                ${!item.href ? 'cursor-default text-[#222]' : 'hover:underline'}`}
              style={{ color: 'inherit', lineHeight: 1.2, height: '1.5rem' }}
            >
              {item.label.length > 20 ? item.label.slice(0, 17) + '...' : item.label}
            </button>
            {index < path.length - 1 && (
              <span className="text-current select-none mx-2">›</span>
            )}
          </span>
        ))}
      </nav>
    </div>
  );
};

export default Breadcrumbs;
