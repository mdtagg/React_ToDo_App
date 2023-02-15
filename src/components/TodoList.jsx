import { useState,useEffect } from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from 'uuid';

const TodoList = ({projects,id,setProjects}) => {

    const [filteredProject] = projects.filter(project => project.id === id)
    const [todoTitle,setTodoTitle] = useState('')
    const [projectTodos,setProjectTodos] = useState([])
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
    // console.log(projects)
    // console.log(projectTodos)
    

    return (
        <>
        {filteredProject && <div className='todo-list'>
            <div className='todo-title'>{filteredProject.title}</div>
            <div>{filteredProject.todo.map(todo => {
                return (
                    <Form className='todo-form'>
                        <Form.Check type='checkbox'/>
                        <span className='title'>{todo.title}</span>
                        <Button type='date'></Button>
                        <div>x</div>
                    </Form>
                )
            })}</div>
            {
            !toggle && 
            <div>
                <button className='add-todo' onClick={handleOnClick}>Add Todo</button>
            </div>
            }
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

// onChange={handleInput}

// onSubmit={handleOnSubmit}

// const [filteredProject] = projects.filter(project => project.id === id)
    // console.log(filteredProject)

 // const [todos,setTodos] = useState(() => projects.map(project => {
    //     return ({
    //         title:project.title,
    //         id:project.id,
    //         date:null,
    //         todoList:[]
    //     })
    // }))

    // const [todoList,setTodoList] = useState([])
    // const [toggle,setToggle] = useState(false)
    
    // useEffect(() => {
    //     setTodos((prevTodos) => {
    //         return [
    //             ...prevTodos,
    //             projects[projects.length - 1]
    //         ]
    //     })
    // },[projects])

    // function handleOnSubmit(e) {
    //     e.preventDefault()
    //     setToggle(false)
    //     setTodoList((prevTodos) => {
    //         return ([
    //             ...prevTodos,
    //             todoTitle
    //         ])
    //     })
    // }

    // function handleOnClick() {
    //     setToggle(true)
    // }

    // function handleInput(e) {
    //     const { value } = e.target
    //     setTodoTitle({
    //         title:value,
    //         id:uuidv4()
    //     })
    // }

    // return (
        // <>
        //     {filteredTodo && <div className='todo-list'>
        //         {/* <div className='todo-title'>{filteredTodo.title}</div> */}
        //         {/* <div>{todoList.map(todo => {
        //             return (
        //                 <div>
        //                     <button></button>
        //                     <button></button>
        //                     <button></button>
        //                     <button></button>
        //                 </div>
        //             )
        //         })}</div> */}
        //         {!toggle && <button className='add-todo' onClick={handleOnClick}>Add Todo</button>}
        //         {toggle && 
        //         <Form onSubmit={handleOnSubmit}>
        //             <Form.Control type='text' name='todo-title' onChange={handleInput}/>
        //             <Button variant='success' type='submit' size='sm'>Add</Button>
        //             <Button variant='danger' size='sm'>Cancel</Button>
        //         </Form>}
        //     </div>}
        // </>

