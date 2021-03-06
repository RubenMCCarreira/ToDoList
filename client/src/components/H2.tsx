import { ReactChild } from 'react';
import { useThemeContext } from '../contexts/Theme';

interface H2Props {
  children: string | ReactChild[];
}

const H2 = ({ children }: H2Props) => {
  const { theme } = useThemeContext();

  return <h2 className={`${theme}`}>{children}</h2>;
};

export default H2;
