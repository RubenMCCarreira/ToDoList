import { useThemeContext } from '../contexts/Theme';
import { IItemState } from '../interfaces';
import { nextClassNames } from '../tools/classnames';

interface TextAreaProps {
  item: IItemState;
  prop?: string;
  onChange: Function;
  placeholder?: string;
}

const TextArea = ({ item, prop, onChange, placeholder }: TextAreaProps) => {
  const { theme } = useThemeContext();

  return (
    <label>
      <span className={nextClassNames([theme, item.error ? 'missing' : ''])}>
        {placeholder}
      </span>
      <textarea
        className={`${theme}`}
        onChange={(e) => onChange(e.target.value, prop)}
        value={item.value || ''}
        placeholder={placeholder}
        rows={4}
      />
    </label>
  );
};

export default TextArea;
