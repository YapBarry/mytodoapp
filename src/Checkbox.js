import React, {useState} from 'react';

export function Checkbox() {
    const [todoList, setTodoList] = useState([{toDo: 'inputtttt'}, {toDo: 'inputtttt2'}, {toDo: 'inputtttt3'}]); // remove hehe and add a "addtodo" function that assigns index to its cb too
    const [cbState, setCbState] = useState([true, false,true]); // add spread operator
    
    const handleOnChange = (position) => {
        const updatedCheckedState = cbState.map((cb, index) =>
          index === position ? !cb : cb
        );
        console.log(cbState)
    }
    return (
        <div>
            <ul>
                {todoList.map((element, index) => (                 
                    <div key={index}>
                        <input
                        key={`cb${index}`}
                        type="checkbox"
                        checked={cbState[index]}
                        onChange={() => handleOnChange(index)}
                        />
                        <span>{element.toDo}</span>
                        <span>{cbState}</span>
                    </div>
                ))
                }
            </ul>
        </div>
    )
};

export default Checkbox;