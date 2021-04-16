import Button from '../components/Button';
import Layout from '../containers/Layout';
import { useThemeContext } from '../contexts/Theme';
import { IHistory } from '../interfaces';

interface NotFoundProps {
  history: IHistory;
}

const NotFound = ({ history }: NotFoundProps) => {
  const { theme } = useThemeContext();

  return (
    <Layout history={history}>
      <h2>Not Found</h2>
      <Button
        label="Home"
        onClick={() => history.push('/')}
        className={`button-home-${theme}`}
      />
    </Layout>
  );
};

export default NotFound;
