"use client";
import React from "react";

export const CustomInput = ({
  title,
  value,
  onChange = () => {},
  classNameAllBlock,
  className,
  ...props
}) => {
  return (
    <div className={`${classNameAllBlock} space-y-1`}>
      <label className="block text-sm font-normal">{title}</label>
      <div className="mt-1">
        <input
          value={value}
          onChange={onChange}
          {...props}
          className={`${className} block w-full rounded-md 
            border border-gray-300 
            px-3 py-2 
            text-gray-600 
            focus:border-blue-500 
            focus:outline-none 
            focus:ring-1
            focus:ring-blue-500 
            sm:text-sm`}
        />
      </div>
    </div>
  );
};
