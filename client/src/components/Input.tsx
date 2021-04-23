import { useThemeContext } from '../contexts/Theme';
import { IItemState } from '../interfaces';
import { nextClassNames } from '../tools/classnames';

interface InputProps {
  item: IItemState;
  prop?: string;
  onChange: Function;
  placeholder: string;
  type?: 'text' | 'password';
  hideTitle?: boolean;
}

const Input = ({
  item,
  prop,
  onChange,
  placeholder,
  type = 'text',
  hideTitle = false
}: InputProps) => {
  const { theme } = useThemeContext();

  return (
    <label>
      <span className={nextClassNames([theme, item.error ? 'missing' : ''])}>
        {!hideTitle && placeholder}
      </span>
      <input
        className={`${theme}`}
        placeholder={placeholder}
        value={item.value || ''}
        onChange={(e) => onChange(e.target.value, prop)}
        type={type}
      />
    </label>
  );
};

export default Input;
