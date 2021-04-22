import { useThemeContext } from '../contexts/Theme';
import { IItemState } from '../interfaces';
import { zoneDateZone } from '../tools/date';
import Missing from './Missing';

interface InputDateProps {
  item: IItemState;
  prop: string;
  onChange: Function;
  min: string;
  max: string;
}

const InputDate = ({ item, prop, onChange, min, max }: InputDateProps) => {
  const { theme } = useThemeContext();

  const handleChange = (e) => {
    const nextValue = new Date(e.target.value);
    onChange(nextValue.toISOString(), prop);
  };

  let stringValue = zoneDateZone(item.value);

  return (
    <div>
      <input
        className={`${theme}`}
        value={stringValue}
        type="datetime-local"
        onChange={handleChange}
        min={min}
        max={max}
      />
      {item.error && <Missing />}
    </div>
  );
};

export default InputDate;
