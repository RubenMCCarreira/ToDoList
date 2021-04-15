import React, { useCallback, useEffect, useState } from 'react';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import Input from '../components/Input';
import Priority from '../components/Priority';
import { useThemeContext } from '../contexts/Theme';

export interface IToDo {
  id: number;
  title: string;
  description: string;
  removed: boolean;
  priority: number;
  done: boolean;
}

interface ToDoProps {
  item: IToDo;
  updateItem: Function;
}

const ToDo = React.memo(({ item, updateItem, ...rest }: ToDoProps) => {
  const [showEdit, setShowEdit] = useState(false);
  const [title, setTitle] = useState<null | string>(null);
  const [description, setDescription] = useState<null | string>(null);
  const [removed, setRemoved] = useState<boolean>(false);
  const [priority, setPriority] = useState<null | number>(null);
  const [done, setDone] = useState<null | boolean>(null);

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
            <form className="to-do-edit">
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
              checked={!!done}
              onChange={() => setDone(!done)}
            />
            <div className={`space-between`}>
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
            <div className={`space-between`}>
              <Button
                label="Edit"
                onClick={() => setShowEdit(true)}
                disabled={removed}
              />
              <Button
                label="Remove"
                onClick={handleRemove}
                disabled={removed}
              />
            </div>
          </div>
        </>
      )}
    </article>
  );
});

export default ToDo;
