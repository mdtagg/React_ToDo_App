import { useState,useEffect } from "react"

const TodoList = ({projects,id}) => {
    const [todos,setTodos] = useState(projects.map(item => {
        return ({
            title:item.title,
            id:item.id,
            date:null
        })
    }))

    useEffect(() => {
        setTodos((prevTodos) => {
            return [
                ...prevTodos,
                projects[projects.length - 1]
            ]
        })
    },[projects])

    const [filteredTodo] = todos.filter(todo => todo.id === id)
    console.log(todos)
    console.log(filteredTodo)

    return (
        <>
            {filteredTodo && <div className='todo-list'>
                <div className='todo-title'>{filteredTodo.title}</div>
                <div></div>
                <button>Add Todo</button>
            </div>}
        </>
        
    )
}

export default TodoList