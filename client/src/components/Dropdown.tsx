import { MouseEventHandler } from 'react';
import { useThemeContext } from '../contexts/Theme';

interface DropdownProps {
  value: string;
  onChange: MouseEventHandler<HTMLButtonElement>;
  values: string[];
}

const Dropdown = ({ value, values, onChange }: DropdownProps) => {
  const { theme } = useThemeContext();

  const handleOnChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <select
      className={`dropdown-${theme}`}
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
