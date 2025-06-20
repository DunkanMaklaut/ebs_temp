import React from "react";
//import "./acceptButton.css"

const AcceptButton = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`
        bg-blue-600 hover:bg-blue-700
        rounded-[14px] 
        text-white
        px-6 py-3 
        font-normal 
        transition-colors 
        duration-200 
        focus:outline-none 
        focus:ring-2 
        focus:ring-[#518BD2] 
        focus:ring-opacity-50
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default AcceptButton;
