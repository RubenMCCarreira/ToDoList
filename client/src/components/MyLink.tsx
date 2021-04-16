import { ReactChild } from 'react';
import { useThemeContext } from '../contexts/Theme';
import { Link } from 'react-router-dom';
import { nextClassNames } from '../tools/classnames';

interface LinkProps {
  children: string | null | ReactChild | ReactChild[];
  to: string;
  className?: string;
}

const MyLink = ({ children, to, className = '' }: LinkProps) => {
  const { theme } = useThemeContext();

  return (
    <Link to={to} className={nextClassNames([theme, className])}>
      {children}
    </Link>
  );
};

export default MyLink;
