import { MouseEventHandler, ReactChild } from 'react';
import { useThemeContext } from '../contexts/Theme';
import { nextClassNames } from '../tools/classnames';

interface ParagraphProps {
  children: string | null | ReactChild | ReactChild[];
  className?: string;
  onClick?: MouseEventHandler<HTMLParagraphElement>;
}

const Paragraph = ({ children, className = '', onClick }: ParagraphProps) => {
  const { theme } = useThemeContext();

  return (
    <p onClick={onClick} className={nextClassNames([theme, className])}>
      {children}
    </p>
  );
};

export default Paragraph;
