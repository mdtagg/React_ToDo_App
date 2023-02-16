import { useState,useEffect } from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from 'uuid';
import UpcomingList from "./UpcomingList";

const TodoList = ({projects,id,setProjects,projectTodos,setProjectTodos,dates,setDates,upcomings}) => {

    const [filteredProject] = projects.filter(project => project.id === id)
    const [todoTitle,setTodoTitle] = useState('')
    const [toggle,setToggle] = useState(false)

    function handleOnClick() {
        setToggle(true)
    }

    function handleInput(e) {
        e.preventDefault()
        const { value } = e.target
        setTodoTitle(value)
    }

    function handleOnSubmit(e) {
        e.preventDefault()
        setToggle(false)
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

    function handleOnDelete(e) {
        const value = e.target.attributes.value.value
        const filteredTodos = projectTodos.filter(todo => todo.id !== value )
        setProjectTodos(filteredTodos)
    }

    function handleDateChange(e) {
        const dateValue = e.target.valueAsDate
        setDates(dateValue)
        setProjects(projects.map(project => {
            if(project.id === id) {
                return ({
                    ...project,
                    date:dateValue
                })
            }else {
                return project
            }
        }))
    }

    useEffect(() => {
        setProjects(projects.map(project => {
            if(project.id === id) {
                return ({
                    ...project,
                    todo: projectTodos
            })
            }else {
                return project
            }
        }))
        
    },[projectTodos])

    // useEffect(() => {
    //     setProjectTodos((prevTodos) => {
    //         return prevTodos.map(todo => {
    //             if(todo)
    //         })
    //     })
    // },[dates])

    return (
        <>
        {upcomings.reveal &&
        <div>
            <div>{upcomings.title}</div>

            {upcomings.title === 'Today' &&
            <div>
                <button className='add-todo' onClick={handleOnClick}>
                    <img className='todo-icon' src='../icons/plus.svg'></img>
                    Add Task
                </button>
            </div>}
        </div>
        }
        {!upcomings.reveal && 
        <div className='todo-list'>
            <div className='todo-title'>{filteredProject.title}</div>
            <div>{filteredProject.todo.map(todo => {
                return (
                    <Form className='todo-form'>
                        <Form.Check type='checkbox'/>
                        <span className='title'>{todo.title}</span>
                        {todo.date === null && <input className='task-date' type='date' onChange={(e) => handleDateChange(e)}></input>}
                        {todo.date !== null && <button>{todo.date}</button>}
                        <div value={todo.id} className='delete-button' onClick={(e) => handleOnDelete(e)}>x</div>
                    </Form>
                )
            })}
            </div>
            {!toggle && 
            <div>
                <button className='add-todo' onClick={handleOnClick}>
                    <img className='todo-icon' src='../icons/plus.svg'></img>
                    Add Task
                    </button>
            </div>}
            {toggle && 
            <Form className='input-form' onSubmit={(e) => handleOnSubmit(e)}>
                <Form.Control type='text' name='todo-title' onChange={handleInput} />
                <div className='button-group'>
                    <Button variant='success' type='submit' size='sm'>Add</Button>
                    <Button variant='danger' size='sm' onClick={() => setToggle(false)}>Cancel</Button>
                </div>
            </Form>}
        </div>}
        </>
    )
}

export default TodoList

