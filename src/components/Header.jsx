
const Header = (props) => {

    const handleClick = () => {
        props.setCompleted((prevState) => {
            return !prevState
        })
    }

    return (
        <header className='header'>
            <h1 className='header-title'>Todo List</h1>
                <div>
                    <button onClick={handleClick} className='completed-tasks-button'>
                        
                        {!props.completed && 
                        <>
                            <img className='todo-icon' src='./icons/check.svg'></img>
                            <p>View Completed Tasks</p>
                        </>
                            
                        }
                        {props.completed &&
                        <>
                            <img className='todo-icon' src='./icons/back.svg' ></img>
                            <p>Back To Menu</p>
                        </>
                        }
                        
                    </button>
                </div>
        </header>
    )
    
}

export default Header