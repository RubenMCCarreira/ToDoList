import { ReactChild } from 'react';
import Button from '../components/Button';
import { IHistory } from '../interfaces';
import { useThemeContext } from '../contexts/Theme';
import Spinier from '../components/Spinier';
import H2 from '../components/H2';
import H4 from '../components/H4';
import Link from '../components/Link';
import Div from '../components/Div';
import { ROUTES } from '../tools/pages';

interface LayoutProps {
  children: ReactChild | ReactChild[];
  title?: string;
  history?: IHistory;
  loading?: boolean | null;
  error?: string | null;
  options?: any;
}

const Layout = ({
  children,
  title,
  history,
  loading,
  error,
  options
}: LayoutProps) => {
  const { theme } = useThemeContext();

  const onLogout = () => {
    if (history) {
      history.push('/logout');
    }
  };

  const onBack = () => {
    if (history) {
      history.goBack();
    }
  };

  return (
    <>
      {!!history && (
        <nav className={theme}>
          <Button label="Back" onClick={onBack} />
          <ul>
            {ROUTES.map(({ page, title }) => (
              <li key={page}>
                <Link
                  to={page}
                  className={`${
                    history.location.pathname == page ? 'active' : ''
                  }`}
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
          <Button label="Log out" onClick={onLogout} />
        </nav>
      )}
      <main>
        {(!!title || !!error) && (
          <Div noWrap pushes={!!options}>
            <div>
              {!!title && <H2>{title}</H2>}
              {!!error && <H4 className="error">{error}</H4>}
            </div>
            {options}
          </Div>
        )}
        {loading && <Spinier />}
        {children}
      </main>
    </>
  );
};

export default Layout;
