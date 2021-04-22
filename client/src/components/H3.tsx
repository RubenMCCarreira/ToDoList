import { useThemeContext } from '../contexts/Theme';

interface H3Props {
  children: string | null;
}

const H3 = ({ children }: H3Props) => {
  const { theme } = useThemeContext();

  return <h3 className={`${theme}`}>{children}</h3>;
};

export default H3;
