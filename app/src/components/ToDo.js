import React, { useCallback } from 'react';
import { useThemeContext } from '../contexts/Theme';

const ToDo = React.memo(({ item, updateItem }) => {
  const { color } = useThemeContext();

  const handleMarkDone = useCallback(() => {
    updateItem({ ...item, done: !item.done });
  }, [item, updateItem]);

  const handleRemove = useCallback(() => {
    updateItem({ ...item, removed: true });
  }, [item, updateItem]);

  return (
    <article className={`to-do-${color}`}>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <div className={`to-do-footer-${color}`}>
        <div className={`to-do-controls-${color}`}>
          <label className={`to-do-control-done-${color}`}>
            <input
              type="checkbox"
              checked={item.done}
              onChange={handleMarkDone}
            />
            Done
          </label>
        </div>
        <button onClick={handleRemove}>Remove</button>
      </div>
    </article>
  );
});

export default ToDo;
