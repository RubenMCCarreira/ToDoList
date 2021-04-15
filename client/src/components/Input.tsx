interface IInput {
  value: string | null;
  onChange: Function;
  placeholder: string;
  type?: 'text' | 'password';
}

const Input = ({ value, onChange, placeholder, type = 'text' }: IInput) => {
  return (
    <input
      placeholder={placeholder}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      type={type}
    />
  );
};

export default Input;
