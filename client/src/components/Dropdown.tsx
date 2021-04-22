import { useThemeContext } from '../contexts/Theme';
import Missing from './Missing';

interface DropdownProps {
  item?: any;
  value: string;
  onChange: Function;
  values: any[];
  prop?: string;
}

const Dropdown = ({ item, value, values, onChange, prop }: DropdownProps) => {
  const { theme } = useThemeContext();

  const handleOnChange = (e) => {
    onChange(e.target.value, prop);
  };

  return (
    <div>
      <select
        className={`${theme}`}
        value={value || item?.value || 'Select One'}
        onChange={handleOnChange}
      >
        <option disabled value="Select One">
          Select One
        </option>
        {values.map((it) => (
          <option key={`option-${it.label || it}`} value={it.value || it}>
            {it.label || it}
          </option>
        ))}
      </select>
      {item?.error && <Missing />}
    </div>
  );
};

export default Dropdown;
