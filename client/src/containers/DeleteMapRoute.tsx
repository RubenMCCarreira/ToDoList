import { useEffect } from 'react';
import withInjectReducer from 'tool/redux/withInjectReducer';
import { IMapRoute } from '../interfaces';
import reducer, {
  stateMapRouteKey,
  mapRouteMapDispatchToProps,
  mapRouteMapStateToProps
} from '../store/mapRoute';
import Table from '../components/Table';

type DeleteMapRouteProps = {
  list: IMapRoute[];
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
        { prop: 'id', label: '#' },
        { prop: 'from.capital', label: 'From' },
        { prop: 'to.capital', label: 'To' },
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
