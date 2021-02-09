import React from 'react';
import { useThemeContext } from '../contexts/Theme';

const Dropdown = () => {
  const { color, setColor, colors } = useThemeContext();

  return (
    <select
      className={`dropdown-${color}`}
      name="Theme"
      value={color}
      onChange={(e) => setColor(e.target.value)}
    >
      {colors.map((it) => (
        <option key={`option-${it}`} value={it}>
          {it}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
