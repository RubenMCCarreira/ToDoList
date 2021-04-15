import ToDos from '../containers/ToDos';
import { IHistory } from '../interfaces';

interface IAll {
  history: IHistory;
}

const All = ({ history }: IAll) => {
  return <ToDos history={history} all />;
};

export default All;
