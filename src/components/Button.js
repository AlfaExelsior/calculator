import React from 'react';
import './Button.css';

function Button({ value, onClick }) {
  const handleClick = () => {
    onClick(value);
  };

  return (
    <button className="button" onClick={handleClick}>
      {value}
    </button>
  );
}

export default Button;
