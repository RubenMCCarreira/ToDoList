import { useEffect, useState } from 'react';
import ToDo, { IToDo } from './ToDo';
import reducer, {
  toDoMapStateToProps,
  toDoMapDispatchToProps,
  stateToDoKey
} from '../store/toDo';
import Spinier from '../components/Spinier';
import { useThemeContext } from '../contexts/Theme';
import { Link } from 'react-router-dom';
import DragDropList from '../components/DragDropList';
import SortOrder from '../components/SortOrder';
import withInjectReducer from 'tool/redux/withInjectReducer';

interface ToDosProps {
  all: boolean;
  getList: Function;
  list: IToDo[] | null;
  reset: Function;
  saveItem: Function;
  loading: boolean | null;
  error: boolean | null;
}

const ToDos = ({
  all,
  getList,
  list,
  reset,
  saveItem,
  loading,
  error
}: ToDosProps) => {
  const [currentOrder, setCurrentOrder] = useState({ prop: null, value: null });
  const { theme } = useThemeContext();

  useEffect(() => {
    return () => {
      reset();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!list) {
      getList(all);
    }
  }, [list, all]); // eslint-disable-line react-hooks/exhaustive-deps

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
          <Link to="/">
            <button>Back</button>
          </Link>
        ) : (
          <Link to="/all">
            <button>See All</button>
          </Link>
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
