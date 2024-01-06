import { useEffect, useState } from 'react'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'

function App() {
  const [todos, setTodos] = useState([]);

  // never modify the state, always directly send a new state
  const addTodo = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const removeTodo = (deletedTodo)=>{
    setTodos((prevTodos)=>{
      const index = prevTodos.indexOf(deletedTodo);
      const Todos = [...prevTodos]
      Todos.splice(index, 1);
      return Todos
    })
  }

  useEffect(()=>{
    fetch(`${import.meta.env.VITE_LOCAL_URL}/todo`)
      .then(async function (res) {
        const data = await res.json();
        // console.log(data.todos);
        setTodos(data.todos)      
      })
  }, [])


  return (
    <div>
      <CreateTodo addTodo = {addTodo}></CreateTodo>
      <Todos todos = {todos}  removeTodo = {removeTodo}></Todos>
    </div>
  )
}

export default App
