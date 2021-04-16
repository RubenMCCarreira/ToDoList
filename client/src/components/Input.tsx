import { useThemeContext } from '../contexts/Theme';
import { IItemState } from '../interfaces';
import Missing from './Missing';

interface InputProps {
  item: IItemState;
  prop?: string;
  onChange: Function;
  placeholder: string;
  type?: 'text' | 'password';
}

const Input = ({
  item,
  prop,
  onChange,
  placeholder,
  type = 'text'
}: InputProps) => {
  const { theme } = useThemeContext();

  return (
    <>
      <input
        className={`${theme}`}
        placeholder={placeholder}
        value={item.value || ''}
        onChange={(e) => onChange(e.target.value, prop)}
        type={type}
      />
      {item.error && <Missing />}
    </>
  );
};

export default Input;
