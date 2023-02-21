import { useState,useEffect } from "react"
import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from 'uuid';

const TodoList = ({projects,setProjects,projectTodos,setProjectTodos,projectId,filteredProject,setCompletedList}) => {

    const [toggleForm,setToggleForm] = useState(false)
    const [todoTitle,setTodoTitle] = useState('')
    
    function handleOnClick() {
        setToggleForm(true)
    }

    function handleInput(e) {
        e.preventDefault()
        const { value } = e.target
        setTodoTitle(value)
    }

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

    function handleOnDelete(e) {
        const value = e.target.dataset.id
        const filteredTodos = projectTodos.filter(todo => todo.id !== value )
        setProjectTodos(filteredTodos)
    }

    function handleDateChange(e) {

        const dateId = e.target.dataset.id
        let dateValue = e.target.value.split('-')
        const temp = dateValue.shift()
        dateValue.push(temp)
        dateValue = dateValue.join('/')

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

    const handleCheckbox = (e) => {
        const taskId = e.target.dataset.id
        const [filteredTodo] = filteredProject.todo.filter(todo => taskId === todo.id)
        filteredTodo.projectTitle = filteredProject.title
        console.log({filteredTodo})
        setCompletedList((prevList) => {
            return [
                ...prevList,
                filteredTodo
            ]
        })
        handleOnDelete(e)
    }

    return (
        <>
        {!filteredProject && projectId === '' &&
        <div className='default'>
            Nothing due yet! Please add more tasks to a project
        </div>}

        {filteredProject &&  
        <div className='todo-list'>
            <div className='todo-title'>{filteredProject.title}</div>
            {
            !filteredProject.todo.length && filteredProject.type === 'upcoming' &&
            <div className='default'>
                Nothing Due
            </div>
            }
            <div>{filteredProject.todo.map(todo => {
                return (
                    <Form key={uuidv4()} className='todo-form'>
                        <Form.Check 
                            data-id={todo.id}
                            type='checkbox' 
                            onClick={(e) => handleCheckbox(e)} 
                        />
                        <div className='title'>{todo.title}</div>
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
                            data-id={todo.id} 
                            className='delete-button' 
                            onClick={(e) => handleOnDelete(e)}
                        >
                            x
                        </div>
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
