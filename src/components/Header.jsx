import { useState } from "react"

const Header = (props) => {

    const handleClick = () => {
        props.setCompleted((prevState) => {
            return !prevState
        })
    }

    return (
        <header className='header'>
            <div>Todo List</div>
            <div>
            <button onClick={handleClick} className='completed-tasks-button'>
                <div><img className='todo-icon' src='./icons/check.svg'></img></div>
                <div>View Completed Tasks</div>
            </button>
            </div>
        </header>
    )
    
}

export default Header