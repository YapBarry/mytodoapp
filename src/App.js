import {useState, useEffect} from 'react';
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

import { query, onSnapshot, doc, updateDoc, deleteDoc, where } from "firebase/firestore";

export function App() {
  const [list, setList] =useState([]);
  const [input, setInput] = useState("");
  const collectionRef = collection(db, 'todo');
  
  useEffect(() => {
    
    const q = query(collectionRef); //where clause if necessary
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todoArray = [];
      querySnapshot.forEach((doc) => {
        todoArray.push({...doc.data(), id: doc.id});
      });
      setList(todoArray);
    })
    return () => unsub();
  }, []);

  const addToDo = async (toDo) => {
    if (input !== "") {
      const newToDo = {
        toDo: toDo,
        completed: false
      };

      await addDoc(collectionRef, newToDo);

      // // add the todo to existing list (for non database method)
      // setList([...list, newToDo]);

      // clear input box
      setInput("");
    }
  };

  // const deleteToDo = (id) => {
  //   const newList = list.filter(toDo => toDo.id !== id);
  //   setList(newList);
  // }

  // // to apply strikethrough formatting to toDo if completed = true
  // const handleToggle = (id) => {
  //   let mapped = list.map(toDo => toDo.id == id ? { ...toDo, completed: !toDo.completed } : { ...toDo});
  //   setList(mapped);
  //   console.log(mapped);
  // };

  const handleEdit = async (todo, list) => { 
    await updateDoc(doc(db, 'todo', todo.id), {toDo: list});
  };
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todo', todo.id), { 
      completed: !todo.completed
    });
  };
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'todo', id));
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
            <input 
            value={toDo.toDo} 
            type="checkbox" 
            onClick={() => toggleComplete(toDo.id)}/>
            <span>{toDo.toDo}</span>
            <button onClick={() => handleDelete(toDo.id)}>&times;</button>  
            <hr></hr>     
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
