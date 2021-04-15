import { MouseEventHandler } from 'react';

interface IButton {
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: 'button' | 'submit';
  className?: string;
}

const Button = ({
  label,
  onClick,
  disabled = false,
  type = 'button',
  className
}: IButton) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={className}
    >
      {label}
    </button>
  );
};

export default Button;
