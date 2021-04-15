import ToDos from '../containers/ToDos';
import { IHistory } from '../interfaces';

interface AllProps {
  history: IHistory;
}

const All = ({ history }: AllProps) => {
  return <ToDos history={history} all />;
};

export default All;
