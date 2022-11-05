import {useState, useEffect} from 'react';
import Checkbox from './Checkbox';
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

import { query, onSnapshot, doc, updateDoc, deleteDoc, orderBy, serverTimestamp, getDoc} from "firebase/firestore";

export function App() {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");
  const [cbState, setCbState] = useState([]);
  const [editState, setEditState] = useState([]);
  const [editField, setEditField] = useState("");
  // const [editOn, setEditOn] = useState([]); // need to remove this

  
  useEffect(() => {
    const collectionRef = collection(db, 'todo');
    const q = query(collectionRef, orderBy('createdAt'));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todoArray = [];
      let cbArray = [];
      let editArray = [];
      querySnapshot.forEach((doc) => {
        todoArray.push({...doc.data(), id: doc.id});
        cbArray.push(doc.data().completed);
        editArray.push(doc.data().edited);
      });
      setList(todoArray);
      setCbState(cbArray);
      setEditState(editArray);
    });
    return () => unsub();
  }, []);

  const addToDo = async (e) => {
    e.preventDefault();
    if (input !== "") {
      const newToDo = {
        toDo: input,
        completed: false,
        edited: false,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'todo'), newToDo);

      // // add the todo to existing list (for non database method)
      // setList([...list, newToDo]);

      // clear input box
      setInput("");
    }
  };

  const handleEdit = async (todo) => { 
    await updateDoc(doc(db, 'todo', todo.id), {
      edited: !todo.edited
    });
  };
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todo', todo.id), { 
      completed: !todo.completed
    });
  };
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'todo', id));
  };


  // const viewMode = (<p>hehe</p>);
  // const editMode = 

  const buttonEditing = (
    <input
    type="text"
    onChange={(e) => setInput(e.target.value)}
    value={input}
    >
    </input>
  );
  // const buttonViewing = <span>{toDo.toDo}</span>;

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
            onChange={() => toggleComplete(toDo)}/>      
            <div>
              { editState[index]? (<input type="text" onChange={(e) => {
                setEditField(toDo.toDo)
                toDo.toDo = e.target.value}
                } value={toDo.toDo}></input>) : <span>{toDo.toDo}</span> }
            </div>;
            <button onClick={() => handleEdit(toDo)}>Edit</button>
            <button onClick={() => handleDelete(toDo.id)}>&times;</button>  
            <hr></hr>     
          </div>
        ))}
      </ul>
    </div>
  );

}

export default App;