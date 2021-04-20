import { ReactChild } from 'react';
import { useThemeContext } from '../contexts/Theme';
import { Link as LinkDom } from 'react-router-dom';
import { nextClassNames } from '../tools/classnames';

interface LinkProps {
  children: string | null | ReactChild | ReactChild[];
  to: string;
  className?: string;
}

const Link = ({ children, to, className = '' }: LinkProps) => {
  const { theme } = useThemeContext();

  return (
    <LinkDom to={to} className={nextClassNames([theme, className])}>
      {children}
    </LinkDom>
  );
};

export default Link;
