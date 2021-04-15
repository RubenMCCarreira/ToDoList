import { IItemState } from '../interfaces';
import Missing from './Missing';

interface IInput {
  item: IItemState;
  onChange: Function;
  placeholder: string;
  type?: 'text' | 'password';
}

const Input = ({ item, onChange, placeholder, type = 'text' }: IInput) => {
  return (
    <>
      <input
        placeholder={placeholder}
        value={item.value || ''}
        onChange={(e) => onChange(e.target.value)}
        type={type}
      />
      {item.error && <Missing />}
    </>
  );
};

export default Input;
