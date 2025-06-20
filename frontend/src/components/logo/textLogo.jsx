import React from 'react';
import './textLogo.css';

function Text(sizeText2) {
    return (
      <div className="logo-text">
        <span className="logo-bold">ТехТОМ</span>
        <span className="logo-span ${sizeText2}">Электронно-библиотечная система</span>
      </div>
    );
  }
  
  export default Text;