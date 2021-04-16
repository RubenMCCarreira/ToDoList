import Button from '../components/Button';
import H2 from '../components/H2';
import Layout from '../containers/Layout';
import { IHistory } from '../interfaces';

interface NotFoundProps {
  history: IHistory;
}

const NotFound = ({ history }: NotFoundProps) => {
  return (
    <Layout history={history}>
      <H2>Not Found</H2>
      <Button label="Home" onClick={() => history.push('/')} />
    </Layout>
  );
};

export default NotFound;
