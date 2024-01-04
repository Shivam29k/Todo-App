/* todos = [
    {
        title: "Go to Gym",
        description: "go to Gym"
    }
] 
*/


export function Todos({todos}) {
    return <div>
        {todos.map((todo)=>{
        return <div>
            <h2> {todo.title} </h2>
            <h3> {todo.description} </h3>
            <button> {todo.completed ? "Completed" : "Mark as Done"} </button>
        </div>
    })}
    </div>
  
}