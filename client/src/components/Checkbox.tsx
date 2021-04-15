import { ChangeEventHandler } from 'react';

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
