import { ReactChild } from 'react';
import { useThemeContext } from '../contexts/Theme';
import { nextClassNames } from '../tools/classnames';

interface ArticleProps {
  children: ReactChild | ReactChild[];
  className?: string;
}

const Article = ({ children, className = '', ...rest }: ArticleProps) => {
  const { theme } = useThemeContext();

  return (
    <article className={nextClassNames([theme, className])} {...rest}>
      {children}
    </article>
  );
};

export default Article;
