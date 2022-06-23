import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd/dist/hooks';

const MovableItem = ({ name, setList, sortHandler, index }) => {
  const movableRef = useRef(null);
  const [, drop] = useDrop({
    accept: 'movable',
    hover(item, monitor) {
      if (!movableRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = movableRef.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      sortHandler(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [collected, drag] = useDrag(() => ({
    type: 'movable',
    item: { name, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  drag(drop(movableRef));
  return (
    <div
      className='movable-item'
      style={{ opacity: collected.isDragging ? 0 : 1 }}
      ref={movableRef}
    >
      {name}
    </div>
  );
};

export default MovableItem;
