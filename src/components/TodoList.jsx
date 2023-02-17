import { useState,useEffect } from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from 'uuid';

const TodoList = ({projects,id,setProjects,projectTodos,setProjectTodos,dates,setDates,upcomings,currentUpcoming}) => {

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
        const filteredDates = dates.filter(date => date.id !== value)
        setProjectTodos(filteredTodos)
        setDates(filteredDates)
    }

    function handleDateChange(e) {

        const todoId = e.target.dataset.id
        let dateValue = e.target.value.split('-')
        const temp = dateValue.shift()
        dateValue.push(temp)
        dateValue = dateValue.join('/')
    
        setDates((prevDates) => {
            return [
                ...prevDates,
                {
                    date:dateValue,
                    id:todoId
                }
            ]
        })
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

    useEffect(() => {
        let currentDate = dates[dates.length - 1]
        if(!dates.length) return
        setProjectTodos((prevTodos) => {
           return prevTodos.map(todo => {
                if(currentDate.id === todo.id) {
                    const { date } = currentDate
                    return ({
                        ...todo,
                        date: date
                    })
                }else {
                    return todo
                }
            })
        })
    },[dates])

    return (
        <>
        {upcomings.reveal &&
        <div className='todo-list'>
            <div className='todo-title'>{upcomings.title}</div>
            {currentUpcoming.map(upcoming => {
                console.log(upcoming)
                return (
                    <Form className='todo-form'>
                        <Form.Check type='checkbox' />
                        
                        <div>{upcoming.date}</div>
                    </Form>
                )
            })}
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
                    <Form key={uuidv4()} className='todo-form'>
                        <Form.Check type='checkbox'/>
                        <span className='title'>{todo.title}</span>
                        {todo.date === null && <input data-id={todo.id} className='task-date' type='date' onChange={(e) => handleDateChange(e)}></input>}
                        {todo.date !== null && <div className='date-button'>{todo.date}</div>}
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

