import { useEffect, useState } from 'react';
import withInjectReducer from 'tool/redux/withInjectReducer';
import ToDo, { IToDo } from './ToDo';
import reducer, {
  toDoMapStateToProps,
  toDoMapDispatchToProps,
  stateToDoKey
} from '../store/toDo';
import Spinier from '../components/Spinier';
import { useThemeContext } from '../contexts/Theme';
import DragDropList from '../components/DragDropList';
import SortOrder from '../components/SortOrder';
import Button from '../components/Button';

interface ToDosProps {
  getList: Function;
  list: IToDo[] | null;
  reset: Function;
  saveItem: Function;
  loading: boolean | null;
  error: boolean | null;
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
  const { theme } = useThemeContext();

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
      <div className={`no-wrap ${theme} pushes`}>
        <div>
          <h2>To Dos ({(list || []).length})</h2>
          {!!error && <h4 className="error">{error}</h4>}
        </div>
        {all ? (
          <Button label="See Active" onClick={() => setAll(false)} />
        ) : (
          <Button label="See All" onClick={() => setAll(true)} />
        )}
      </div>
      <div className={`to-dos-options ${theme}`}>
        <SortOrder
          values={['title', 'done', 'priority']}
          currentOrder={currentOrder}
          onChange={handleSortOrder}
        />
      </div>
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
