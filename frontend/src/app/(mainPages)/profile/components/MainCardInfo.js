"use client";
import React from "react";

export const MainCardInfo = ({ children }) => {
  return (
    <div className="flex-grow min-h-[600] bg-white rounded-lg shadow-sm w-3/3 p-4 flex flex-col gap-2.5 mb-6">
      {children}
    </div>
  );
};
