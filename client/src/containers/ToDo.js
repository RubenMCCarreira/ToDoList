import React, { useCallback, useEffect, useState } from 'react';
import Checkbox from '../components/Checkbox';
import Input from '../components/Input';
import Priority from '../components/Priority';
import { useThemeContext } from '../contexts/Theme';

const ToDo = React.memo(({ item, updateItem, ...rest }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [removed, setRemoved] = useState(null);
  const [priority, setPriority] = useState(null);
  const [done, setDone] = useState(null);

  const { theme } = useThemeContext();

  useEffect(() => {
    setTitle(item.title);
    setDescription(item.description);
    setRemoved(item.removed);
    setPriority(item.priority);
    setDone(item.done);
  }, [item]);

  const handleMarkDone = useCallback(() => {
    updateItem({ ...item, done: !item.done });
  }, [item, updateItem]);

  const handleUpdate = useCallback(() => {
    updateItem({ ...item, title, description, removed, priority, done });
    setShowEdit(false);
  }, [item, updateItem, title, description, removed, priority, done]);

  const handleRemove = useCallback(() => {
    updateItem({ ...item, removed: true });
  }, [item, updateItem]);

  const handleCancel = useCallback(() => {
    setTitle(item.title);
    setDescription(item.description);
    setShowEdit(false);
  }, [item]);

  return (
    <article className={`to-do ${theme}`} {...rest}>
      {showEdit ? (
        <>
          <div className={`no-wrap ${theme} pushes`}>
            <form>
              <Input value={title} placeholder="Title" onChange={setTitle} />
              <Input
                value={description}
                placeholder="Description"
                onChange={setDescription}
              />
            </form>
            <Priority value={priority} onChange={setPriority} />
          </div>
          <div className={`no-wrap ${theme} pushes`}>
            <Checkbox
              title="Done"
              checked={done}
              onChange={() => setDone(!done)}
            />
            <div>
              <button onClick={handleCancel}>Cancel</button>
              <button onClick={handleUpdate}>Save</button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={`no-wrap ${theme} pushes`}>
            <div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
            <Priority value={priority} disabled />
          </div>
          <div className={`no-wrap ${theme} pushes`}>
            <Checkbox
              title="Done"
              checked={item.done}
              disabled={removed}
              onChange={handleMarkDone}
            />
            <div>
              <button onClick={() => setShowEdit(true)} disabled={removed}>
                Edit
              </button>
              <button onClick={handleRemove} disabled={removed}>
                Remove
              </button>
            </div>
          </div>
        </>
      )}
    </article>
  );
});

export default ToDo;
