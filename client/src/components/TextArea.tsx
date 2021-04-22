import { useThemeContext } from '../contexts/Theme';
import { IItemState } from '../interfaces';
import Missing from './Missing';

interface TextAreaProps {
  item: IItemState;
  prop?: string;
  onChange: Function;
  placeholder?: string;
}

const TextArea = ({ item, prop, onChange, placeholder }: TextAreaProps) => {
  const { theme } = useThemeContext();

  return (
    <>
      <textarea
        className={`${theme}`}
        onChange={(e) => onChange(e.target.value, prop)}
        value={item.value || ''}
        placeholder={placeholder}
        rows={4}
        cols={50}
      />

      {item.error && <Missing />}
    </>
  );
};

export default TextArea;
