import { ChangeEventHandler } from 'react';
import { useThemeContext } from '../contexts/Theme';

interface CheckboxProps {
  title: string;
  checked: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

const Checkbox = ({
  title,
  checked = false,
  onChange,
  disabled = false
}: CheckboxProps) => {
  const { theme } = useThemeContext();

  return (
    <label className={`${theme}`}>
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
