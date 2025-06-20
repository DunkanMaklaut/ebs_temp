import React from "react";

export const IconAccept = ({ color = "#333", size = "21.5" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 21.5 21.5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.75 21.5C4.81 21.5 0 16.69 0 10.75S4.81 0 10.75 0s10.75 4.81 10.75 10.75-4.81 10.75-10.75 10.75Zm4.77-13.11c.35-.42.3-1.05-.13-1.41-.42-.35-1.05-.3-1.41.13l-4.3 5.16-2.23-2.23c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l3 3c.2.2.47.3.75.29.28-.01.54-.14.72-.36l5-6Z"
        fill={color}
      />
    </svg>
  );
};