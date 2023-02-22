import { useState,useEffect } from "react"
import TaskTab from "./TaskTab";
import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from 'uuid';

const TodoList = ({projects,setProjects,projectTodos,setProjectTodos,projectId,filteredProject,setCompletedList}) => {

    //toggles between add task form and button 
    const [toggleForm,setToggleForm] = useState(false)
    //stores the add task input 
    const [todoTitle,setTodoTitle] = useState('')
    
    const handleOnClick = () => {
        setToggleForm(true)
    }

    const handleInput = (e) => {
        e.preventDefault()
        const { value } = e.target
        setTodoTitle(value)
    }

    //adds todos to the project todo state
    const handleOnSubmit = (e) => {
        e.preventDefault()
        setToggleForm(false)
        setProjectTodos((prevTodos) => {
            return [
                ...prevTodos,
                {
                    title:todoTitle,
                    id:uuidv4(),
                    date:null
                }
            ]
        })
    }

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
            <div className='title'>
                {filteredProject.title}
            </div>
            
            {!filteredProject.todo.length && filteredProject.type === 'upcoming' &&
            <div className='default'>
                Nothing Due
            </div>} 

            <TaskTab
                filteredProject={filteredProject}
                setProjectTodos={setProjectTodos}
                setCompletedList={setCompletedList}
                projectTodos={projectTodos}
            />
            {!toggleForm && filteredProject.type !== 'upcoming' &&
            <div>
                <button className='add-todo' onClick={handleOnClick}>
                    <img className='todo-icon' src='../icons/plus.svg'></img>
                    Add Task
                    </button>
            </div>}
            {toggleForm && 
            <Form className='input-form' onSubmit={(e) => handleOnSubmit(e)}>
                <Form.Control 
                    type='text' 
                    name='todo-title' 
                    onChange={handleInput} 
                />
                <div className='button-group'>
                    <button className='add-button' type='submit'>Add</button>
                    <button className='cancel-button' onClick={() => setToggleForm(false)}>Cancel</button>
                </div>
            </Form>}
        </div>}
        </>
    )
}

export default TodoList

