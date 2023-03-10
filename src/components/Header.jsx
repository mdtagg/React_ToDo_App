
const Header = (props) => {

    const handleClick = () => {
        props.setCompleted((prevState) => {
            return !prevState
        })
    }

    return (
        <header className='header'>
            <div className='header-title'>Todo List</div>
            <div>
                <button onClick={handleClick} className='completed-tasks-button'>
                    {!props.completed && 
                    <>
                        <img className='todo-icon' src='./icons/check.svg'></img>
                        View Completed Tasks
                    </>
                    }
                    {props.completed &&
                    <>
                        <img className='todo-icon' src='./icons/back.svg' ></img>
                        Back To Menu
                    </>
                    }
                </button>
            </div>
        </header>
    )
    
}

export default Header