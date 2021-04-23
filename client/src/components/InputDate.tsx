import { useThemeContext } from '../contexts/Theme';
import { IItemState } from '../interfaces';
import { nextClassNames } from '../tools/classnames';
import { zoneDateZone } from '../tools/date';

interface InputDateProps {
  item: IItemState;
  prop: string;
  onChange: Function;
  min: string;
  max: string;
  placeholder: string;
}

const InputDate = ({
  item,
  prop,
  onChange,
  min,
  max,
  placeholder
}: InputDateProps) => {
  const { theme } = useThemeContext();

  const handleChange = (e) => {
    const nextValue = new Date(e.target.value);

    if (nextValue instanceof Date && !isNaN(nextValue.valueOf())) {
      onChange(nextValue.toISOString(), prop);
    }
  };

  let stringValue = zoneDateZone(item.value);

  return (
    <label>
      <span className={nextClassNames([theme, item.error ? 'missing' : ''])}>
        {placeholder}
      </span>
      <input
        className={`${theme}`}
        value={stringValue}
        type="datetime-local"
        onChange={handleChange}
        min={min}
        max={max}
      />
    </label>
  );
};

export default InputDate;
