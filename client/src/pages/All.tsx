import Layout from '../containers/Layout';
import ToDos from '../containers/ToDos';
import { IHistory } from '../interfaces';

interface IAll {
  history: IHistory;
}

const All = ({ history }: IAll) => {
  return (
    <Layout>
      <ToDos history={history} all />
    </Layout>
  );
};

export default All;
