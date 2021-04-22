import ToDos from '../containers/ToDos';
import NewToDo from '../containers/NewToDo';
import { IHistory } from '../interfaces';
import Layout from '../containers/Layout';

interface InitialProps {
  history: IHistory;
}

const Initial = ({ history }: InitialProps) => {
  return (
    <Layout history={history}>
      <NewToDo />
      <ToDos />
    </Layout>
  );
};

export default Initial;
