import React, { useCallback } from 'react';
import { useThemeContext } from '../contexts/Theme';

const ToDo = React.memo(({ item, updateItem }) => {
  const { color } = useThemeContext();

  const onChange = useCallback(() => {
    const nextItem = { ...item };
    nextItem.done = !nextItem.done;
    updateItem(nextItem);
  }, [item, updateItem]);

  return (
    <article className={`to-do-${color}`}>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <div className={`to-do-controls-${color}`}>
        <label className={`to-do-control-done-${color}`}>
          <input type="checkbox" checked={item.done} onChange={onChange} /> Done
        </label>
      </div>
    </article>
  );
});

export default ToDo;
