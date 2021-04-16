import { IHistory } from '../interfaces';
import Layout from '../containers/Layout';
import MapChart from '../containers/MapChart';

interface MapProps {
  history: IHistory;
}

const Map = ({ history }: MapProps) => {
  return (
    <Layout history={history}>
      <MapChart />
    </Layout>
  );
};

export default Map;
