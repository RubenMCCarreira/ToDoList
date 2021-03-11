import React from 'react';

const Input = ({ value, onChange, placeholder, type = 'text' }) => {
  return (
    <input
      placeholder={placeholder}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      type={type}
    />
  );
};

export default Input;
