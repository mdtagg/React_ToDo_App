import { useState } from "react"

const TodoList = ({projects}) => {
    const [todo,setTodo] = useState(() => projects.map(project => {
        return {
            title:project.title,
            id:project.id,
            reveal:projects.reveal
        }
    }))
    
    return (
        <div className='todo-list'>
            
        </div>
    )
}

export default TodoList