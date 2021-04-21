import { MouseEventHandler, ReactChild } from 'react';
import { useThemeContext } from '../contexts/Theme';
import { nextClassNames } from '../tools/classnames';

interface SpanProps {
  children: ReactChild | ReactChild[];
  className?: string;
  onClick?: MouseEventHandler<HTMLParagraphElement>;
  bold?: boolean
}

const Span = ({ children, className = '', onClick, bold }: SpanProps) => {
  const { theme } = useThemeContext();

  const nextClassName = nextClassNames([
    theme,
    bold ? 'bold' : '',
    className
  ]);

  return (
    <span onClick={onClick} className={nextClassName}>
      {children}
    </span>
  );
};

export default Span;
