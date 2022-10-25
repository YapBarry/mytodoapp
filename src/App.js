import {useState} from 'react';


export function App() {
  const [list, setList] =useState([]);
  const [input, setInput] = useState("");

  const addToDo = (toDo) => {
    const newToDo = {
      id: Math.random(),
      toDo: toDo,
      completed: false
    };

    // add the todo to existing list
    setList([...list, newToDo]);

    // clear input box
    setInput("");

  };

  const deleteToDo = (id) => {
    const newList = list.filter(toDo => toDo.id !== id);
    setList(newList);
  }

  // to apply strikethrough formatting to toDo if completed = true
  const handleToggle = (id) => {
    let mapped = list.map(toDo => toDo.id == id ? { ...toDo, completed: !toDo.completed } : { ...toDo});
    setList(mapped);
    console.log(mapped);
  };

  return (
    <div className="App">
      <h1>To Do List</h1>
      <input 
      type="text"
      onChange={(e) => setInput(e.target.value)}
      value={input}
      ></input>
      <button onClick={() => addToDo(input)}>Add To Do</button>
      <ul>
        {list.map((toDo) => (
          <div key={toDo.id} className={toDo.completed ? "strike" : ""}>
            <input value={toDo.toDo} type="checkbox" onClick={() => handleToggle(toDo.id)}/>
            <span>{toDo.toDo}</span>
            <button onClick={() => deleteToDo(toDo.id)}>&times;</button>  
            <hr></hr>     
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
