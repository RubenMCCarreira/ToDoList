import { MouseEventHandler, ReactChild } from 'react';
import { useThemeContext } from '../contexts/Theme';
import { nextClassNames } from '../tools/classnames';

interface SpanProps {
  children: ReactChild | ReactChild[];
  className?: string;
  onClick?: MouseEventHandler<HTMLParagraphElement>;
}

const Span = ({ children, className = '', onClick }: SpanProps) => {
  const { theme } = useThemeContext();

  return (
    <span onClick={onClick} className={nextClassNames([theme, className])}>
      {children}
    </span>
  );
};

export default Span;
