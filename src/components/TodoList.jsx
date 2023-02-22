import { useEffect } from "react"
import TaskTab from "./TaskTab";
import TaskButton from "./TaskButton";

const TodoList = ({projects,setProjects,projectTodos,setProjectTodos,projectId,filteredProject,setCompletedList}) => {

    //adds the todos to the todo property in the associated project 
    useEffect(() => {
        setProjects(projects.map(project => {
            if(project.id === projectId) {
                return ({
                    ...project,
                    todo: projectTodos
                })
            }else {
                return project
            }
        }))
        
    },[projectTodos])

    return (
        <>
        {!filteredProject && projectId === '' &&
        <div className='default'>
            Nothing due yet! Please add more tasks to a project
        </div>}

        {filteredProject &&  
        <div className='todo-list'>
            <div className='title'>{filteredProject.title}</div>
            <TaskTab
                filteredProject={filteredProject}
                setProjectTodos={setProjectTodos}
                setCompletedList={setCompletedList}
                projectTodos={projectTodos}
            />
            <TaskButton
                setProjectTodos={setProjectTodos}
                filteredProject={filteredProject}
            />
        </div>}
        </>
    )
}

export default TodoList

