import ProjectsList from "./ProjectsList"
import UpcomingList from "./UpcomingList"
import TodoList from "./TodoList"
import { useState,useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';

const Dashboard = () => {
     
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
    const [projectTodos,setProjectTodos] = useState([])
    const [id,setId] = useState('')
    const [date,setDate] = useState('')
    const [upcomings,setUpcomings] = useState({
        title:'',
        reveal:true
    })
    const [filteredProject] = projects.filter(project => project.id === id)

    useEffect(() => {
        setProjectTodos(filteredProject == undefined ? [] : filteredProject.todo)
    },[id])

    // useEffect(() => {
    //     setUpcomings((prevUpcoming) => ({
    //         ...prevUpcoming,
    //         reveal:false
    //     }))
    // },[filteredProject])

// console.log(filteredProject)
    console.log(upcomings)
    return (
        <main className='main'>
            <aside className='todo-sidebar'>
                <UpcomingList upcomings={upcomings} setUpcomings={setUpcomings} />
                <ProjectsList setUpcomings={setUpcomings} setId={setId} projects={projects} setProjects={setProjects} />
            </aside>
            <TodoList upcomings={upcomings} date={date} setDate={setDate} projectTodos={projectTodos} setProjectTodos={setProjectTodos} id={id} projects={projects} setProjects={setProjects} />
        </main>
    )
}

export default Dashboard