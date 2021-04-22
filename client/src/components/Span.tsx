import { ReactChild } from 'react';
import { useThemeContext } from '../contexts/Theme';
import { nextClassNames } from '../tools/classnames';

interface SpanProps {
  children: ReactChild | ReactChild[];
  className?: string;
  onClick?: Function;
  bold?: boolean;
}

const Span = ({ children, className = '', onClick, bold }: SpanProps) => {
  const { theme } = useThemeContext();

  const nextClassName = nextClassNames([
    theme,
    bold ? 'bold' : '',
    className,
    onClick ? 'click' : ''
  ]);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <span onClick={handleClick} className={nextClassName}>
      {children}
    </span>
  );
};

export default Span;
