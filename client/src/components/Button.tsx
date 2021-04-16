import { MouseEventHandler } from 'react';
import { useThemeContext } from '../contexts/Theme';
import { nextClassNames } from '../tools/classnames';

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
  className = ''
}: ButtonProps) => {
  const { theme } = useThemeContext();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={nextClassNames([theme, className])}
    >
      {label}
    </button>
  );
};

export default Button;
