import { useState,useEffect } from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const TodoList = ({projects,id,setProjects,projectTodos,setProjectTodos}) => {

    const [filteredProject] = projects.filter(project => project.id === id)
    const [todoTitle,setTodoTitle] = useState('')
    // const [projectTodos,setProjectTodos] = useState([])
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
                    date:null
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

    return (
        <>
        {filteredProject && 
        <div className='todo-list'>
            <div className='todo-title'>{filteredProject.title}</div>
            <div>{filteredProject.todo.map(todo => {
                return (
                    <Form className='todo-form'>
                        <Form.Check type='checkbox'/>
                        <span className='title'>{todo.title}</span>
                        <input className='task-date' type='date'></input>
                        <div>x</div>
                    </Form>
                )
            })}
            </div>
            {!toggle && 
            <div>
                <button className='add-todo' onClick={handleOnClick}><img className='todo-icon' src='../icons/plus.svg'></img>Add Todo</button>
            </div>}
            {toggle && 
            <Form onSubmit={(e) => handleOnSubmit(e)}>
                <Form.Control type='text' name='todo-title' onChange={handleInput} />
                <Button variant='success' type='submit' size='sm'>Add</Button>
                <Button variant='danger' size='sm' onClick={() => setToggle(false)}>Cancel</Button>
            </Form>}
        </div>}
        </>
    )
}

export default TodoList

