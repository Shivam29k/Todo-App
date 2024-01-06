import { useState } from "react";

export function Todos({ todos, removeTodo }) {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} removeTodo={removeTodo} />
      ))}
    </div>
  );
}

function TodoItem({ todo, removeTodo }) {
  const [completed, updateStatus] = useState(todo.completed);

  const handleMarkAsDone = () => {
    if (!completed) {
      fetch(`${import.meta.env.VITE_LOCAL_URL}/completed`, {
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
    fetch(`${import.meta.env.VITE_LOCAL_URL}/delete`, {
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
    <div>
      <h2>{todo.title}</h2>
      <h3>{todo.description}</h3>
      <button onClick={handleMarkAsDone}>
        {completed ? "Completed" : "Mark as Done"}
      </button>
      {completed ? <button onClick={handleDelete}>delete</button> : null}
    </div>
  );
}
