import { useDrag } from 'react-dnd/dist/hooks';
const MovableItem = ({ title, setList }) => {
  const movingHanlder = (colNo, item) => {
    setList((p) =>
      p.map((l) => (l.name === item.title ? { ...l, column: colNo } : l))
    );
  };
  const [collected, drag] = useDrag(() => ({
    type: 'movable',
    item: { title },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult && dropResult.name === 'first-column') {
        movingHanlder(1, item);
      } else {
        movingHanlder(2, item);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  return (
    <div
      className='movable-item'
      style={{ opacity: collected.isDragging ? 0.4 : 1 }}
      ref={drag}
    >
      {title}
    </div>
  );
};

export default MovableItem;
