import { useThemeContext } from '../contexts/Theme';

interface CheckboxProps {
  title: string;
  checked: boolean;
  onChange: Function;
  disabled?: boolean;
}

const Checkbox = ({
  title,
  checked = false,
  onChange,
  disabled = false
}: CheckboxProps) => {
  const { theme } = useThemeContext();

  const handleChange = () => {
    onChange();
  };

  return (
    <label className={`${theme} no-wrap`}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
      />
      {title}
    </label>
  );
};

export default Checkbox;
