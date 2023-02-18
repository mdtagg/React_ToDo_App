import ProjectsList from "./ProjectsList"
import UpcomingList from "./UpcomingList"
import TodoList from "./TodoList"
import { useState,useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';

const Dashboard = () => {
     
    //projects state is initialized lazy with two placeholder projects 
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

    //the projectId state is used to track which project tab is currently pressed
    const [projectId,setProjectId] = useState('')

    const [projectTodos,setProjectTodos] = useState([])
    const [dates,setDates] = useState([])
    const [upcomings,setUpcomings] = useState({
        title:'',
        reveal:true
    })
    const [currentUpcoming,setCurrentUpcoming] = useState([])
    const [filteredProject] = projects.filter(project => project.id === projectId)

    useEffect(() => {
        setProjectTodos(filteredProject == undefined ? [] : filteredProject.todo)
    },[projectId])

    //Here we are rendering the sidebar on the left side of the main section and the todo section which displays all the todos in 
    //both the upcomings and projects sections
    return (
        <main className='main'>
            <aside className='todo-sidebar'>
                <UpcomingList 
                    setCurrentUpcoming={setCurrentUpcoming} 
                    projects={projects} 
                    dates={dates} 
                    upcomings={upcomings} 
                    setUpcomings={setUpcomings} 
                />
                <ProjectsList 
                    setUpcomings={setUpcomings} 
                    setProjectId={setProjectId} 
                    projects={projects} 
                    setProjects={setProjects} 
                />
            </aside>
            <TodoList 
                currentUpcoming={currentUpcoming} 
                upcomings={upcomings} 
                dates={dates} 
                setDates={setDates} 
                projectTodos={projectTodos} 
                setProjectTodos={setProjectTodos} 
                projectId={projectId} 
                projects={projects} 
                setProjects={setProjects} 
            />
        </main>
    )
}

export default Dashboard