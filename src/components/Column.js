import React from 'react';
import { useDrop } from 'react-dnd/dist/hooks';

const Column = ({ children, title, onDrop }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'movable',
    drop: (item, monitor) => {
      onDrop(title, item, monitor);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const highlight = isOver ? 'highlight' : title;
  return (
    <div className={`column ${highlight}`} ref={drop}>
      <h3>{title}</h3>
      {children}
    </div>
  );
};

export default Column;
