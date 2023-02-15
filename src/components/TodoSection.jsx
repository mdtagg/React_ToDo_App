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
                todo:[]
            },
            {
                title:'test two',
                id: uuidv4(),
                todo:[]
            }
        ]
    })
    // console.log(projects)

    const [id,setId] = useState('')

    return (
        <main className='main'>
            <aside className='todo-sidebar'>
                <UpcomingList/>
                <ProjectsList setId={setId} projects={projects} setProjects={setProjects} />
            </aside>
            <TodoList id={id} projects={projects} setProjects={setProjects} />
        </main>
    )
}

export default TodoSection