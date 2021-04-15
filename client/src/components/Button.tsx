import { MouseEventHandler } from 'react';

interface ButtonProps {
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
}: ButtonProps) => {
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
