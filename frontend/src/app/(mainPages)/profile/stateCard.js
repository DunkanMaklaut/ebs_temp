"use client";
import React from "react";

export const stateCard = {
  down: 0,
  up: 1,
  none: 2,
};

export const MiniCardStats = ({ title, value, minValue, stateNumberCard }) => {
  return (
    <div className="flex flex-col  p-4 bg-white rounded-lg shadow-md w-70 h-32 border border-[#F0F0F0]">
      <div className="text-2xl font-semibold text-gray-700 mb-2">{title}</div>

      <div className="flex mt-2 gap-2">
        <div className="text-4xl font-bold text-blue-600 ">{value}</div>

        <div className="flex items-center justify-center mt-2">
          <div className="text-xl font-medium text-green-500 mr-2">
            {minValue}
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
