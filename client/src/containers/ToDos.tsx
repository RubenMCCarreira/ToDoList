import { useEffect, useState } from 'react';
import withInjectReducer from 'tool/redux/withInjectReducer';
import ToDo, { IToDo } from './ToDo';
import reducer, {
  toDoMapStateToProps,
  toDoMapDispatchToProps,
  stateToDoKey
} from '../store/toDo';
import Spinier from '../components/Spinier';
import DragDropList from '../components/DragDropList';
import SortOrder from '../components/SortOrder';
import Button from '../components/Button';
import H2 from '../components/H2';
import H4 from '../components/H4';
import Div from '../components/Div';

interface ToDosProps {
  getList: Function;
  list: IToDo[] | null;
  reset: Function;
  saveItem: Function;
  loading: boolean | null;
  error: string | null;
}

const ToDos = ({
  getList,
  list,
  reset,
  saveItem,
  loading,
  error
}: ToDosProps) => {
  const [currentOrder, setCurrentOrder] = useState({ prop: null, value: null });
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
    <>
      {loading && <Spinier />}
      <Div noWrap pushes>
        <Div>
          <H2>To Dos ({(list || []).length})</H2>
          <>{!!error && <H4 className="error">{error}</H4>}</>
        </Div>
        {all ? (
          <Button label="See Active" onClick={() => setAll(false)} />
        ) : (
          <Button label="See All" onClick={() => setAll(true)} />
        )}
      </Div>
      <Div className={`to-dos-options`}>
        <SortOrder
          values={['title', 'done', 'priority']}
          currentOrder={currentOrder}
          onChange={handleSortOrder}
        />
      </Div>
      <Div className={`to-dos`}>
        {all ? (
          (list || []).map((it) => (
            <ToDo key={it.id} item={it} updateItem={saveItem} />
          ))
        ) : (
          <DragDropList
            list={list || []}
            component={ToDo}
            updateItem={saveItem}
          />
        )}
      </Div>
    </>
  );
};

export default withInjectReducer(
  stateToDoKey,
  reducer,
  toDoMapStateToProps,
  toDoMapDispatchToProps,
  ToDos
);
