import { IHistory } from '../interfaces';
import Layout from '../containers/Layout';
import MapChart from '../containers/MapChart';
import Tabs from '../components/Tabs';
import Tab from '../components/Tab';
import NewMapRoute from '../containers/NewMapRoute';
import DeleteMapRoute from '../containers/DeleteMapRoute';

interface MapProps {
  history: IHistory;
}

const Map = ({ history }: MapProps) => {
  return (
    <Layout history={history}>
      <MapChart />
      <Tabs>
        <Tab title="Create new Route">
          <NewMapRoute />
        </Tab>
        <Tab title="Delete Route">
          <DeleteMapRoute />
        </Tab>
      </Tabs>
    </Layout>
  );
};

export default Map;
