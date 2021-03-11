import React from 'react';

const Checkbox = ({ title, checked, disabled, onChange }) => {
  return (
    <label>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      {title}
    </label>
  );
};

export default Checkbox;
