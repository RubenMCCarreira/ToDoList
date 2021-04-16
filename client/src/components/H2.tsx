import { ReactChild } from 'react';
import { useThemeContext } from '../contexts/Theme';

interface H2Props {
  children: string | null | ReactChild | ReactChild[];
}

const H2 = ({ children }: H2Props) => {
  const { theme } = useThemeContext();

  return <h3 className={`${theme}`}>{children}</h3>;
};

export default H2;
