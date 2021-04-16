import { MouseEventHandler, ReactChild } from 'react';
import { useThemeContext } from '../contexts/Theme';
import { nextClassNames } from '../tools/classnames';

interface H3Props {
  children: string | null | ReactChild | ReactChild[];
  className?: string;
  onClick?: MouseEventHandler<HTMLParagraphElement>;
}

const H3 = ({ children, className = '', onClick }: H3Props) => {
  const { theme } = useThemeContext();

  return (
    <p onClick={onClick} className={nextClassNames([theme, className])}>
      {children}
    </p>
  );
};

export default H3;
