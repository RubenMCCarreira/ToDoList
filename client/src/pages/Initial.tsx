import withInjectReducer from 'tool/redux/withInjectReducer';
import ToDos from '../containers/ToDos';
import NewToDo from '../containers/NewToDo';
import { IHistory, IOrder, IToDo } from '../interfaces';
import Layout from '../containers/Layout';
import reducer, {
  toDoMapStateToProps,
  toDoMapDispatchToProps,
  stateToDoKey
} from '../store/toDo';
import { useEffect, useState } from 'react';
import Button from '../components/Button';

interface InitialProps {
  history: IHistory;
  getList: Function;
  list: IToDo[] | null;
  reset: Function;
  loading: boolean | null;
  error: string | null;
}

const Initial = ({
  history,
  list,
  getList,
  reset,
  loading,
  error
}: InitialProps) => {
  const [currentOrder, setCurrentOrder] = useState<IOrder>({
    prop: null,
    value: null
  });
  const [all, setAll] = useState(false);

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  useEffect(() => {
    reset();
  }, [all]);

  useEffect(() => {
    if (!list) {
      getList(all);
    }
  }, [list, all]);

  const handleSortOrder = (nextOrder) => {
    setCurrentOrder(nextOrder);
    getList(all, nextOrder);
  };

  return (
    <Layout
      history={history}
      title={`To Dos (${(list || []).length})`}
      error={error}
      loading={loading}
      options={
        all ? (
          <Button label="See Active" onClick={() => setAll(false)} />
        ) : (
          <Button label="See All" onClick={() => setAll(true)} />
        )
      }
    >
      <NewToDo />
      <ToDos
        handleSortOrder={handleSortOrder}
        currentOrder={currentOrder}
        all={all}
      />
    </Layout>
  );
};

export default withInjectReducer(
  stateToDoKey,
  reducer,
  toDoMapStateToProps,
  toDoMapDispatchToProps,
  Initial
);
