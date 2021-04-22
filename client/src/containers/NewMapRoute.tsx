import { useEffect } from 'react';
import withInjectReducer from 'tool/redux/withInjectReducer';
import reducer, {
  stateMapRouteKey,
  mapRouteMapDispatchToProps,
  mapRouteMapStateToProps
} from '../store/mapRoute';
import Form from './Form';

type NewMapRouteProps = {
  other: any;
  getOther: Function;
  saveItem: Function;
};

const NewMapRoute = ({ other, getOther, saveItem }: NewMapRouteProps) => {
  useEffect(() => {
    if (!other) {
      getOther();
    }
  }, [other]);

  return (
    <Form
      items={[
        {
          prop: 'from',
          placeholder: 'From',
          mandatory: true,
          type: 'select',
          values: (other?.capitals || []).map((it) => ({
            label: it.capital,
            value: it.capital
          }))
        },
        {
          prop: 'departure',
          placeholder: 'Departure',
          mandatory: true,
          type: 'dateTime'
        },
        {
          prop: 'to',
          placeholder: 'To',
          mandatory: true,
          type: 'select',
          values: (other?.capitals || []).map((it) => ({
            label: it.capital,
            value: it.capital
          }))
        },
        {
          prop: 'arrive',
          placeholder: 'Arrive',
          mandatory: true,
          type: 'dateTime'
        }
      ]}
      onSubmit={saveItem}
      label="Create"
      grid
    />
  );
};

export default withInjectReducer(
  stateMapRouteKey,
  reducer,
  mapRouteMapStateToProps,
  mapRouteMapDispatchToProps,
  NewMapRoute
);
