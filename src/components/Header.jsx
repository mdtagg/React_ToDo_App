
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
                    <img className='todo-icon' src='./icons/check.svg'></img>
                    View Completed Tasks
                </button>
            </div>
        </header>
    )
    
}

export default Header