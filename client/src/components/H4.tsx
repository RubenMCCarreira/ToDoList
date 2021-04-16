import { ReactChild } from 'react';
import { useThemeContext } from '../contexts/Theme';
import { nextClassNames } from '../tools/classnames';

interface H4Props {
  children: string | null | ReactChild | ReactChild[];
  className?: string;
}

const H4 = ({ children, className = '' }: H4Props) => {
  const { theme } = useThemeContext();

  return <h4 className={nextClassNames([theme, className])}>{children}</h4>;
};

export default H4;
