import { ReactChild } from 'react';
import { useThemeContext } from '../contexts/Theme';
import { nextClassNames } from '../tools/classnames';

interface ArticleProps {
  children: ReactChild | ReactChild[];
  id?: string;
}

const Article = ({ children, id, ...rest }: ArticleProps) => {
  const { theme } = useThemeContext();

  return (
    <article id={id} className={nextClassNames([theme])} {...rest}>
      {children}
    </article>
  );
};

export default Article;
