import React, { useCallback, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragDrop from '../containers/DragDrop';

const DragDropList = ({ list, component, ...rest }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (list) {
      setItems(list);
    }
  }, [list]);

  const reorderItem = useCallback(
    (dragIndex, hoverIndex) => {
      const aux = [...items];
      const dragCard = aux.splice(dragIndex, 1)[0];
      aux.splice(hoverIndex, 0, dragCard);
      setItems([...aux]);
    },
    [items]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      {items.map((item, index) => (
        <DragDrop
          component={component}
          key={index}
          index={index}
          item={item}
          reorderItem={reorderItem}
          {...rest}
        />
      ))}
    </DndProvider>
  );
};

export default DragDropList;
