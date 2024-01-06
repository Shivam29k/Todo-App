import { useState } from "react";


// any hooks can't be used in loops or conditional statements 

export function Todos({ todo, removeTodo }) {
  const [completed, updateStatus] = useState(todo.completed);

  const handleMarkAsDone = () => {
    if (!completed) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/completed`, {
        method: "PUT",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          id: todo._id,
          completed: true,
        }),
      }).then(() => updateStatus(true));
    }
  };

  const handleDelete = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/delete`, {
      method: "DELETE",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        id: todo._id,
      }),
    }).then(() => {
      removeTodo(todo);
      alert("Todo Deleted.");
    });
  };

  return (
    <div className="todo-item">
      <div className={completed? 'completed' : 'notCompleted'}>
      <h2>{todo.title}</h2>
      <h3>{todo.description}</h3>
      </div>
      {completed? <button style={{
            padding: 10,
            marginBottom: 10,
            width: '100%',
            boxSizing: 'border-box',
            backgroundColor: 'lightgreen'
        }}>Completed</button> : <button onClick={handleMarkAsDone} style={{
          padding: 10,
          width: '100%',
          // boxSizing: 'border-box',
          backgroundColor: 'lightgreen'
      }}>Mark as done</button>}
      {completed ? <button onClick={handleDelete} style={{
            padding: 10,
            width: '100%',
            boxSizing: 'border-box',
            backgroundColor: 'red',
            color: 'white'
        }}>delete</button> : null}
    </div>
  );
}
