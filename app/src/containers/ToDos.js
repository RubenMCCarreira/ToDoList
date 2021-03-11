import React, { useCallback, useEffect, useState } from 'react';
import ToDo from './ToDo';
import { connect } from 'react-redux';
import reducer, {
  toDoMapStateToProps,
  toDoMapDispatchToProps
} from '../store/toDo';
import Spinier from '../components/Spinier';
import { useThemeContext } from '../contexts/Theme';
import { Link } from 'react-router-dom';
import DragDropList from '../components/DragDropList';
import withReducer from '../store/withReducer';

const ToDos = ({ all, getList, list, reset, saveItem, loading, error }) => {
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

  return (
    <>
      {loading && <Spinier />}
      <section>
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
      </section>
    </>
  );
};

export default withReducer(
  'toDo',
  reducer,
  toDoMapStateToProps,
  toDoMapDispatchToProps,
  ToDos
);
