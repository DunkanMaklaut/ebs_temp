import React from 'react';
import './textField.css'; // Импортируем файл стилей

const TextField = ({ value, onChange, labelText, style, className, placeholder }) => {
  return (
    <div className={`textFieldContainer ${className}`} style={style}>
      {labelText && <label className="labelText">{labelText}</label>}
      <input
        type="text"
        className="textField"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextField;