import React from 'react';
import "./button.css"

const Button = function(props) {
  const buttonClassName = props.className ? `button ${props.className}` : 'button';

  return (
    <button className='btn ${buttonClassName}' onClick={props.onClick}>
      {props.label}
    </button>
  );
}

export default Button;