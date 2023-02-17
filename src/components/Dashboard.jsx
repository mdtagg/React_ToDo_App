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
    const [dates,setDates] = useState([])
    const [upcomings,setUpcomings] = useState({
        title:'',
        reveal:true
    })
    const [currentUpcoming,setCurrentUpcoming] = useState([])
    // console.log(currentUpcoming)

    const [filteredProject] = projects.filter(project => project.id === id)

    useEffect(() => {
        setProjectTodos(filteredProject == undefined ? [] : filteredProject.todo)
    },[id])

    return (
        <main className='main'>
            <aside className='todo-sidebar'>
                <UpcomingList projectTodos={projectTodos} setCurrentUpcoming={setCurrentUpcoming} projects={projects} setProjects={setProjects} dates={dates} upcomings={upcomings} setUpcomings={setUpcomings} />
                <ProjectsList setUpcomings={setUpcomings} setId={setId} projects={projects} setProjects={setProjects} />
            </aside>
            <TodoList currentUpcoming={currentUpcoming} upcomings={upcomings} dates={dates} setDates={setDates} projectTodos={projectTodos} setProjectTodos={setProjectTodos} id={id} projects={projects} setProjects={setProjects} />
        </main>
    )
}

export default Dashboard