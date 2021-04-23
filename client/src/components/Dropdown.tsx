import { useThemeContext } from '../contexts/Theme';
import { nextClassNames } from '../tools/classnames';

interface DropdownProps {
  item?: any;
  value: string;
  onChange: Function;
  values: any[];
  prop?: string;
  placeholder: string;
}

const Dropdown = ({
  item,
  value,
  values,
  onChange,
  prop,
  placeholder
}: DropdownProps) => {
  const { theme } = useThemeContext();

  const handleOnChange = (e) => {
    onChange(e.target.value, prop);
  };

  return (
    <label>
      <span className={nextClassNames([theme, item?.error ? 'missing' : ''])}>
        {placeholder}
      </span>
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
    </label>
  );
};

export default Dropdown;
