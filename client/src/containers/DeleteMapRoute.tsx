import { useEffect } from 'react';
import withInjectReducer from 'tool/redux/withInjectReducer';
import Paragraph from '../components/Paragraph';
import Span from '../components/Span';
import reducer, {
  stateMapRouteKey,
  mapRouteMapDispatchToProps,
  mapRouteMapStateToProps
} from '../store/mapRoute';

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

  return (list || []).map((it, index) => (
    <Paragraph key={index}>
      {`${it.from.capital} -> ${it.to.capital}`}
      <Span onClick={() => deleteItem(it.id)} bold>
        Remove
      </Span>
    </Paragraph>
  ));
};

export default withInjectReducer(
  stateMapRouteKey,
  reducer,
  mapRouteMapStateToProps,
  mapRouteMapDispatchToProps,
  DeleteMapRoute
);
