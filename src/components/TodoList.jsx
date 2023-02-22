import { useState,useEffect } from "react"
import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from 'uuid';
import { Temporal } from '@js-temporal/polyfill';

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


    const handleOnDelete = (e) => {
        const value = e.target.dataset.id
        const filteredTodos = projectTodos.filter(todo => todo.id !== value )
        setProjectTodos(filteredTodos)
    }

    //changes the date output to a format easier for parsing. When a date is entered its is then 
    //added to the associated todo which triggers a change in the projectTodos state. This then 
    //triggers an update to the projects state
    function handleDateChange(e) {

        const dateId = e.target.dataset.id
        const dateValue = parseDay(e.target.value.split('-'))
      
        setProjectTodos((prevTodos) => {
            return prevTodos.map(todo => {
                if(todo.id === dateId) {
                    return ({
                        ...todo,
                        date:dateValue
                    })
                }else {
                    return todo
                }
            })
        })
    }

    //the project title is added to the filtered todo and the completed state is updated to that 
    //filtered todo
    const handleCheckbox = (e) => {
        const currentDate = Temporal.Now.plainDateISO()
        const currentDay = parseDay(currentDate.toString().split('-'))

        const taskId = e.target.dataset.id
        const [filteredTodo] = filteredProject.todo.filter(todo => taskId === todo.id)
        filteredTodo.projectTitle = filteredProject.title
        filteredTodo.currentDate = currentDay
        setCompletedList((prevList) => {
            return [
                ...prevList,
                filteredTodo
            ]
        })
        handleOnDelete(e)
    }

    const parseDay = (day) => {
        let temp = ''
        temp = day.shift()
        day.push(temp)
        return day.join('/')
    }

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
            <div>{filteredProject.todo.map(todo => {
                return (
                    <Form key={uuidv4()} className='todo-form'>
                        <Form.Check 
                            data-id={todo.id}
                            type='checkbox' 
                            onClick={(e) => handleCheckbox(e)} 
                        />
                        <div>
                            {todo.title}
                        </div>
                        {todo.date === null && 
                            <input 
                                data-id={todo.id} 
                                className='task-date' 
                                type='date' 
                                onChange={(e) => handleDateChange(e)}
                            >
                            </input>
                        }
                        {todo.date !== null && 
                            <div className='date-button'>
                                {todo.date}
                            </div>
                        }
                        {filteredProject.type !== 'upcoming' && 
                        <div 
                            data-id={todo.id} 
                            className='delete-button' 
                            onClick={(e) => handleOnDelete(e)}
                        >
                            x
                        </div>}
                    </Form>
                )
            })}
            </div>
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

