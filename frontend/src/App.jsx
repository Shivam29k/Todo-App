import { useEffect, useState } from 'react'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  useEffect(()=>{
    fetch('http://localhost:3000/todo')
      .then(async function (res) {
        const data = await res.json();
        // console.log(data.todos);
        setTodos(data.todos)      
      })
  }, [])


  return (
    <div>
      <CreateTodo addTodo = {addTodo}></CreateTodo>
      <Todos todos = {todos} ></Todos>
    </div>
  )
}

export default App
