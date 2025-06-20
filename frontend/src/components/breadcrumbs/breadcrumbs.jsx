// src/components/breadcrumbs/Breadcrumbs.jsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import './breadcrumbs.css';

const Breadcrumbs = ({ path }) => {
  const router = useRouter();

  const handleClick = (href) => {
    if (href) router.push(href);
  };

  return (
    <div className="breadcrumbs-card">
        <div className="breadcrumbs">
        {path.map((item, index) => (
            <span key={index} className="breadcrumb-segment">
            <button
                className="breadcrumb-button"
                onClick={() => handleClick(item.href)}
                disabled={!item.href}
                title={item.label}
            >
                {item.label.length > 20 ? item.label.slice(0, 17) + '...' : item.label}
            </button>
            {index < path.length - 1 && <span className="breadcrumb-separator">›</span>}
            </span>
        ))}
        </div>
    </div>
  );
};

export default Breadcrumbs;
