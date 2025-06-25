"use client";
import React from "react";

export const ButtonTxt = ({ onClick, className, children, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`${className} px-2 py-4  text-left text-sm font-medium rounded-lg transition-colors duration-200 `}
      {...props}
    >
      {children}
    </button>
  );
};
