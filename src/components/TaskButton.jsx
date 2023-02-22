import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from 'uuid';

const TaskButton = ({setProjectTodos,filteredProject}) => {

    //stores the add task input 
    const [todoTitle,setTodoTitle] = useState('')

    //toggles between add task form and button 
    const [toggleForm,setToggleForm] = useState(false)
    
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

    return (
        <>
        {!toggleForm && filteredProject.type !== 'upcoming' &&
        <div>
            <button className='add-todo' onClick={handleOnClick}>
                <img 
                    className='todo-icon' 
                    src='../icons/plus.svg'
                >
                </img>
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
                <button 
                    className='add-button' 
                    type='submit'
                >
                    Add
                </button>
                <button 
                    className='cancel-button' 
                    onClick={() => setToggleForm(false)}
                >
                    Cancel
                </button>
            </div>
        </Form>}
        </>
        
    )
}

export default TaskButton