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

  const sortHandler = (dragIndex, hoverIndex) => {
    const dragItem = list[dragIndex];
    // console.log(
    //   `dragindex ${dragIndex} hoverindex ${hoverIndex} dragItem ${dragItem}`
    // );
    if (dragItem) {
      setList((prevState) => {
        const copyPrevState = prevState;
        // console.log(copyPrevState);
        const hoverItem = copyPrevState.splice(hoverIndex, 1, dragItem);
        //console.log(copyPrevState);
        copyPrevState.splice(dragIndex, 1, hoverItem[0]);
        //console.log(copyPrevState);
        return copyPrevState;
      });
    }
  };
  return (
    <div>
      <h2>DND Sample</h2>
      <DndProvider backend={HTML5Backend}>
        <div className='container'>
          <Column title='first-column'>
            {/* {itemList(1)?.map((p, index) => ( */}
            {list.map((p, index) =>
              p.column === 1 ? (
                <MovableItem
                  title={p.name}
                  key={p.name}
                  setList={setList}
                  sortHandler={sortHandler}
                  index={index}
                />
              ) : (
                ''
              )
            )}
          </Column>
          <Column title='second-column'>
            {list.map((p, index) =>
              p.column === 2 ? (
                <MovableItem
                  title={p.name}
                  key={p.name}
                  setList={setList}
                  sortHandler={sortHandler}
                  index={index}
                />
              ) : (
                ''
              )
            )}
          </Column>
        </div>
      </DndProvider>
    </div>
  );
}

export default App;
