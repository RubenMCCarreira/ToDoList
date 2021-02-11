import React from 'react';
import { useThemeContext } from '../contexts/Theme';

const Dropdown = ({ value, values, onChange }) => {
  const { theme } = useThemeContext();

  const handleOnChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <select
      className={`dropdown-${theme}`}
      name="Theme"
      value={value}
      onChange={handleOnChange}
    >
      {values.map((it) => (
        <option key={`option-${it}`} value={it}>
          {it}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
