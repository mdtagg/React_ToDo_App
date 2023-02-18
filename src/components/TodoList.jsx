import { useState,useEffect } from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from 'uuid';

const TodoList = ({projects,setProjects,projectTodos,setProjectTodos,dates,setDates,upcomings,currentUpcoming,projectId}) => {

    //filteredProject is used to determine if a project tab has been clicked and if so which project todos to render 
    const [filteredProject] = projects.filter(project => project.id === projectId)

    //toggle is used to change the display of the add task form and add task button 
    const [toggleForm,setToggleForm] = useState(false)

    //the todo title state is used to track the input of the add task form 
    const [todoTitle,setTodoTitle] = useState('')
    
    //when the add task button is clicked toggle state is changed which renders the add task form
    function handleOnClick() {
        setToggleForm(true)
    }

    //when the add task form recieves input the todoTitle state is set to its value 
    function handleInput(e) {
        e.preventDefault()
        const { value } = e.target
        setTodoTitle(value)
    }

    //when the add task form is submitted toggle state is changed back to false which renders the add task button again
    //the project todos state is also set to all the previous todos and a new todo with the todo title, unique id and a date property
    function handleOnSubmit(e) {
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

    //after the todos state is set the projects state is updated with a useEffect that tracks the project todos state. 
    //if the id of the project in the projects state matches the projectId (project that was last clicked) that projects 
    //properties are returned but the todo property is set to the todos in the projectTodos state
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

    //value takes the value attribute on the delete button (which is that todos id) and uses it to filter all the todos whose id
    //dont match the id of the todo whose delete button was pressed. Filtered project is set to an empty string to prevent an attempt
    //to map a filtered project that no longer exists after deletion. 


    function handleOnDelete(e) {
        filteredProject = ''
        const value = e.target.attributes.value.value
        const filteredTodos = projectTodos.filter(todo => todo.id !== value )
        const filteredDates = dates.filter(date => date.id !== value)
        setProjectTodos(filteredTodos)
        setDates(filteredDates)
    }

    // function handleDateChange(e) {

    //     const todoId = e.target.dataset.id
    //     let dateValue = e.target.value.split('-')
    //     const temp = dateValue.shift()
    //     dateValue.push(temp)
    //     dateValue = dateValue.join('/')
    
    //     setDates((prevDates) => {
    //         return [
    //             ...prevDates,
    //             {
    //                 date:dateValue,
    //                 id:todoId
    //             }
    //         ]
    //     })
    // }

    

    // useEffect(() => {
    //     let currentDate = dates[dates.length - 1]
    //     if(!dates.length) return
    //     setProjectTodos((prevTodos) => {
    //        return prevTodos.map(todo => {
    //             if(currentDate.id === todo.id) {
    //                 const { date } = currentDate
    //                 return ({
    //                     ...todo,
    //                     date: date
    //                 })
    //             }else {
    //                 return todo
    //             }
    //         })
    //     })
    // },[dates])

    return (
        <>
        {/* {upcomings.reveal &&
        <div className='todo-list'>
            <div className='todo-title'>{upcomings.title.length ? upcomings.title : 'Today'}</div>
            {currentUpcoming.map(upcoming => {
                console.log(upcoming)
                return (
                    <Form className='todo-form'>
                        <Form.Check type='checkbox' />
                        <div>{upcoming.date}</div>
                    </Form>
                )
            })}
            {(upcomings.title === 'Today' || upcomings.title === '') &&
            <div>
                <button className='add-todo' onClick={handleOnClick}>
                    <img className='todo-icon' src='../icons/plus.svg'></img>
                    Add Task
                </button>
            </div>}
        </div>
        } */}

        {filteredProject &&  
        <div className='todo-list'>
            <div className='todo-title'>{filteredProject.title}</div>
            <div>{filteredProject.todo.map(todo => {
                return (
                    <Form key={uuidv4()} className='todo-form'>
                        <Form.Check type='checkbox'/>
                        <span className='title'>
                            {todo.title}
                        </span>
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
                        <div 
                            value={todo.id} 
                            className='delete-button' 
                            onClick={(e) => handleOnDelete(e)}
                        >
                            x
                        </div>
                    </Form>
                )
            })}
            </div>
            {!toggleForm && 
            <div>
                <button className='add-todo' onClick={handleOnClick}>
                    <img className='todo-icon' src='../icons/plus.svg'></img>
                    Add Task
                    </button>
            </div>}
            {toggleForm && 
            <Form className='input-form' onSubmit={(e) => handleOnSubmit(e)}>
                <Form.Control type='text' name='todo-title' onChange={handleInput} />
                <div className='button-group'>
                    <Button variant='success' type='submit' size='sm'>Add</Button>
                    <Button variant='danger' size='sm' onClick={() => setToggleForm(false)}>Cancel</Button>
                </div>
            </Form>}
        </div>}
        </>
    )
}

export default TodoList

