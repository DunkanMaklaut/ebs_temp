import React from "react";

export const IconStar = ({ color = "#333333", size = "20" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.788 1.21C9.236 0.133002 10.764 0.133002 11.212 1.21L13.294 6.216L18.698 6.65C19.862 6.743 20.334 8.195 19.447 8.955L15.33 12.482L16.587 17.755C16.858 18.891 15.623 19.788 14.627 19.18L10 16.354L5.373 19.18C4.377 19.788 3.142 18.89 3.413 17.755L4.67 12.482L0.553003 8.955C-0.333998 8.195 0.138003 6.743 1.302 6.65L6.706 6.216L8.788 1.21Z"
        fill={color}
      />
    </svg>
  );
};
