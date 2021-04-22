import { useEffect } from 'react';
import withInjectReducer from 'tool/redux/withInjectReducer';
import reducer, {
  stateMapRouteKey,
  mapRouteMapDispatchToProps,
  mapRouteMapStateToProps
} from '../store/mapRoute';
import { formatDate } from '../tools/date';
import Table from './Table';

type DeleteMapRouteProps = {
  list: any[];
  getList: Function;
  deleteItem: Function;
};

const DeleteMapRoute = ({ list, getList, deleteItem }: DeleteMapRouteProps) => {
  useEffect(() => {
    if (!list) {
      getList();
    }
  }, [list]);

  return (
    <Table
      headers={[
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
        },
        {
          label: 'Options',
          prop: null,
          options: [
            {
              label: 'Remove',
              callback: (row) => deleteItem(row.id)
            }
          ]
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
  DeleteMapRoute
);
