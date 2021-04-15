import { MouseEventHandler } from 'react';

interface IButton {
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: 'button' | 'submit';
}

const Button = ({
  label,
  onClick,
  disabled = false,
  type = 'button'
}: IButton) => {
  return (
    <button onClick={onClick} disabled={disabled} type={type}>
      {label}
    </button>
  );
};

export default Button;
