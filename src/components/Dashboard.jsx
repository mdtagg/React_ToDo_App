import ProjectsList from "./ProjectsList"
import UpcomingList from "./UpcomingList"
import TodoList from "./TodoList"
import { useState,useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';

const Dashboard = ({completed}) => {
    
    const [projects, setProjects] = useState(() => {
        
        return [
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
    })
    const [projectId,setProjectId] = useState('')
    const [projectTodos,setProjectTodos] = useState([])
    const [dates,setDates] = useState([])
    const [completedList,setCompletedList] = useState([])
    console.log(completedList)

    const [filteredProject] = projects.filter(project => project.id === projectId)

    useEffect(() => {
        setProjectTodos((projectId === '' || filteredProject == undefined) ? [] : filteredProject.todo)
    },[projectId])

    // console.log({filteredProject,projectId})
   

    //Here we are rendering the sidebar on the left side of the main section and the todo section which displays all the todos in 
    //both the upcomings and projects sections
    return (
        <>
        {!completed && 
        <main className='main'>
            <aside className='todo-sidebar'>
                <UpcomingList 
                    projects={projects} 
                    setProjectId={setProjectId}
                    dates={dates}
                    setDates={setDates}
                    setProjects={setProjects}
                />
                <ProjectsList 
                    setProjectId={setProjectId} 
                    projects={projects} 
                    setProjects={setProjects} 
                    filteredProject={filteredProject}
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
                    <tr>
                        <th>Project</th>
                        <th>Task Name</th>
                        <th>Date Completed</th>
                    </tr>
                    {completedList.map(item => {
                        return (
                            <tr>
                                <td>{item.projectTitle}</td>
                                <td>{item.title}</td>
                                <td>{item.date}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
            }
        </>
    )
}

export default Dashboard


