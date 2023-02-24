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
        <div className='text-4xl text-center m-auto'>
            Nothing due yet! Please add more tasks to a project
        </div>}

        {filteredProject &&  
        <div class='flex flex-col gap-3 w-1/2 mx-auto p-8' >
            <div class='text-2xl font-bold'>{filteredProject.title}</div>
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

