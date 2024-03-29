import { useState } from "react";

export function CreateTodo({ addTodo }) {
    // react-querry
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    return <div>
        <input style={{
            padding: 10,
            marginBottom: 10,
            width: '100%',
            boxSizing: 'border-box'
        }} type="text" placeholder="title" onChange={(e) =>{
            const value = e.target.value;
            setTitle(value)
        }}></input> <br />
        <input style={{
            padding: 10,
            marginBottom: 10,
            width: '100%',
            boxSizing: 'border-box'
        }} type="text" placeholder="description" onChange={(e) =>{
            const value = e.target.value;
            setDescription(value)
        }}></input> <br />

        <button style={{
            padding: 10,
            marginBottom: 40,
            width: '100%',
            boxSizing: 'border-box',
            backgroundColor: 'lightgreen'
        }}  onClick={()=>{
            fetch(`${import.meta.env.VITE_BACKEND_URL}/todo`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                })
            })
                .then(async (res)=> {
                    const json =  await res.json();
                    alert("Todo added");
                    addTodo({
                        title: title,
                        description: description,
                        completed: false
                    });
                })
        }}>Add a todo</button>
    </div>
} 