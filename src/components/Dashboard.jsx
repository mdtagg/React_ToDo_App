import ProjectsList from "./ProjectsList"
import UpcomingList from "./UpcomingList"
import TodoList from "./TodoList"
import UseLocalStorage from "../hooks/UseLocalStorage"
import { useState,useEffect,createContext } from "react"
import { v4 as uuidv4 } from 'uuid';

const Dashboard = ({completed}) => {
    
    //UseLocalStorage checks for an object with key projects in local storage, if not found the 
    //state is set to an array of objects representing the upcoming and project tabs

    const [projects, setProjects] = UseLocalStorage('projects',
        
        [
            {
                title: 'test',
                type: 'project',
                id: uuidv4(),
                todo:[]
            },
            {
                title:'test two',
                type:'project',
                id: uuidv4(),
                todo:[]
            },
            {
                title:'Today',
                type: 'upcoming',
                img: 'icons/inbox.svg',
                id: uuidv4(),
                todo: [],
                dates: []
            },
            {
                title: 'This Week',
                type: 'upcoming',
                img:'icons/today.svg',
                id: uuidv4(),
                todo:[],
                dates: []
            },
            {
                title: 'This Month',
                type:'upcoming',
                img:'icons/week.svg',
                id:uuidv4(),
                todo:[],
                dates:[]
            }
        ]
    )

    //projectId is set to the id of the project tab that is last clicked.
    const [projectId,setProjectId] = useState('')
    const [projectTodos,setProjectTodos] = useState([])
    const [dates,setDates] = useState([])
    //completedList is used to track the completed tasks and store them in local storage
    const [completedList,setCompletedList] = UseLocalStorage('completedTasks',[])
    //filteredProject compares the id of each project tab against the projectId to retrieve the project
    //that was last clicked
    const [filteredProject] = projects.filter(project => project.id === projectId)

    //sets the todos attached to the last clicked project to the projectTodos state. 
    //If a tab has not been clicked yet or one of the projects has been deleted, projectTodos state
    //is set to an empty array, otherwise its set to the todos associated with that project
    useEffect(() => {
        setProjectTodos((projectId === '' || filteredProject == undefined) ? [] : filteredProject.todo)
    },[projectId])
   
    return (
        <>
        {!completed && 
        <main className='main'>
            <aside className='todo-sidebar'>
                <UpcomingList 
                    projects={projects} 
                    setProjects={setProjects}
                    setProjectId={setProjectId}
                    dates={dates}
                    setDates={setDates}
                />
                <ProjectsList 
                    projects={projects} 
                    setProjects={setProjects} 
                    filteredProject={filteredProject}
                    setProjectId={setProjectId} 
                />
            </aside>
            <TodoList 
                projectTodos={projectTodos} 
                setProjectTodos={setProjectTodos} 
                projectId={projectId} 
                projects={projects} 
                setProjects={setProjects} 
                filteredProject={filteredProject}
                setCompletedList={setCompletedList}
            />
        </main>
        
            }
            {completed && 
            <div className='completed-container'>
                <table>
                    <thead>
                        <tr>
                            <th>Project</th>
                            <th>Task Name</th>
                            <th>Date Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                    {completedList.map(item => {
                        return (
                            <tr key={uuidv4()}>
                                <td>{item.projectTitle}</td>
                                <td>{item.title}</td>
                                <td>{item.date}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                    
                </table>
            </div>
            }
        </>
    )
}

export default Dashboard


