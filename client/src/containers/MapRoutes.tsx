import { useEffect } from 'react';
import withInjectReducer from 'tool/redux/withInjectReducer';
import { IMapRoute } from '../interfaces';
import reducer, {
  stateMapRouteKey,
  mapRouteMapDispatchToProps,
  mapRouteMapStateToProps
} from '../store/mapRoute';
import { formatDate } from '../tools/date';
import Table from '../components/Table';

type MapRoutesProps = {
  list: IMapRoute[];
  getList: Function;
};

const MapRoutes = ({ list, getList }: MapRoutesProps) => {
  useEffect(() => {
    if (!list) {
      getList();
    }
  }, [list]);

  return (
    <Table
      headers={[
        { prop: 'id', label: '#' },
        { prop: 'from.capital', label: 'From' },
        {
          prop: 'departure',
          label: 'Departure',
          callback: (value) => formatDate(value)
        },
        { prop: 'to.capital', label: 'To' },
        {
          prop: 'arrive',
          label: 'Arrive',
          callback: (value) => formatDate(value)
        }
      ]}
      rows={list}
    />
  );
};

export default withInjectReducer(
  stateMapRouteKey,
  reducer,
  mapRouteMapStateToProps,
  mapRouteMapDispatchToProps,
  MapRoutes
);
