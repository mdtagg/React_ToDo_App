import ProjectsList from "./ProjectsList"
import UpcomingList from "./UpcomingList"
import TodoList from "./TodoList"
import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';

const TodoSection = () => {
    const [projects, setProjects] = useState(() => {
        return [
            {
                title: 'test',
                id: uuidv4(),
                reveal:false
            },
            {
                title:'test two',
                id: uuidv4(),
                reveal:false
            }
        ]
    })
    return (
        <main className='main'>
            <aside className='todo-sidebar'>
                <UpcomingList/>
                <ProjectsList projects={projects} setProjects={setProjects} />
            </aside>
            <TodoList projects={projects} />
        </main>
    )
}

export default TodoSection