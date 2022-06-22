import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import MovableItem from './components/MovableItem';
import Column from './components/Column';
import { useState } from 'react';

function App() {
  const data = [
    { name: 'card 1', column: 1 },
    { name: 'card 2', column: 2 },
    { name: 'card 3', column: 1 },
    { name: 'card 4', column: 2 },
    { name: 'card 5', column: 1 },
  ];
  const [list, setList] = useState(data);
  const itemList = (flag) => {
    return list?.filter((p) => p.column === flag);
  };
  return (
    <div>
      <h2>DND Sample</h2>
      <DndProvider backend={HTML5Backend}>
        <div className='container'>
          <Column title='first-column'>
            {itemList(1)?.map((p) => (
              <MovableItem title={p.name} key={p.name} setList={setList} />
            ))}
          </Column>
          <Column title='second-column'>
            {itemList(2)?.map((p) => (
              <MovableItem title={p.name} key={p.name} setList={setList} />
            ))}
          </Column>
        </div>
      </DndProvider>
    </div>
  );
}

export default App;
