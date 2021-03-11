import React, { useEffect, useState } from 'react';
import ToDo from './ToDo';
import reducer, {
  toDoMapStateToProps,
  toDoMapDispatchToProps
} from '../store/toDo';
import Spinier from '../components/Spinier';
import { useThemeContext } from '../contexts/Theme';
import { Link } from 'react-router-dom';
import DragDropList from '../components/DragDropList';
import SortOrder from '../components/SortOrder';
import withInjectReducer from 'tool/redux/withInjectReducer';

const ToDos = ({ all, getList, list, reset, saveItem, loading, error }) => {
  const [currentOrder, setCurrentOrder] = useState({});
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
      <div className={`to-dos-header-${theme}`}>
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
      <div>
        <SortOrder
          title="title"
          currentOrder={currentOrder}
          onChange={handleSortOrder}
        />
        <SortOrder
          title="done"
          currentOrder={currentOrder}
          onChange={handleSortOrder}
        />
        <SortOrder
          title="priority"
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
  'toDo',
  reducer,
  toDoMapStateToProps,
  toDoMapDispatchToProps,
  ToDos
);
