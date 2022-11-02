import {useState, useEffect} from 'react';
import Checkbox from './Checkbox';
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

import { query, onSnapshot, doc, updateDoc, deleteDoc, where } from "firebase/firestore";

export function App() {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");
  const [cbState, setCbState] = useState([]);
  
  
  useEffect(() => {
    const collectionRef = collection(db, 'todo');
    const q = query(collectionRef); //where clause if necessary
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todoArray = [];
      let cbArray = [];
      querySnapshot.forEach((doc) => {
        todoArray.push({...doc.data(), id: doc.id});
        // console.log(doc.data().completed);
        cbArray.push(doc.data().completed);
        // console.log(todoArray); 
        // console.log(cbArray)
        // console.log(cbArray[0]);
        // console.log(cbArray[1]);
        // console.log(cbArray[2]);
        // console.log(cbArray[3]);
        // update here by creating an array and pushing to it during query snapshot
        // and then setting it to setCb in the next line
      });
      setList(todoArray);
      setCbState(cbArray);
    });
    return () => unsub();
  }, []);

  const addToDo = async (e) => {
    e.preventDefault();
    if (input !== "") {
      const newToDo = {
        toDo: input,
        completed: false
      };

      await addDoc(collection(db, 'todo'), newToDo);

      // // add the todo to existing list (for non database method)
      // setList([...list, newToDo]);

      // clear input box
      setInput("");
    }
  };

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
      <form onSubmit={addToDo}>
        <h1>To Do List</h1>
        <input 
        type="text"
        onChange={(e) => setInput(e.target.value)}
        value={input}
        ></input>
        <button type="submit">Add To Do</button>
      </form>
      <ul>
        {list.map((toDo,index) => (
          <div key={toDo.id} className={toDo.completed ? "strike" : ""}>
            <input 
            value={toDo.toDo} 
            type="checkbox" 
            checked={cbState[index]}
            onClick={() => toggleComplete(toDo)}/>
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
