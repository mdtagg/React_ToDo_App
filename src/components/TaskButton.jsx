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
            <button class='flex items-center font-normal gap-2 w-full border-rounded p-1 text-xl hover:gray-400' onClick={handleOnClick}>
                <img class='h-5' src='./icons/plus.svg'></img>
                <div>Add Task</div>
            </button>
        </div>}
        {toggleForm && 
        <form className='input-form' onSubmit={(e) => handleOnSubmit(e)}>
            <input 
                type='text' 
                name='todo-title' 
                onChange={handleInput} 
            />
            <div className='button-group'>
                <button className='add-button' type='submit'>
                    Add
                </button>
                <button className='cancel-button' onClick={() => setToggleForm(false)}>
                    Cancel
                </button>
            </div>
        </form>}
        </>
        
    )
}

export default TaskButton