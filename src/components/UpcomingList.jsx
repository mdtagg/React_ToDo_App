
const UpcomingList = () => {
    return (
        <div className='sidebar-group'>
            <button className='button-container'>
                <img className='todo-icon' src='icons/inbox.svg'></img>
                    Inbox
            </button>
            <button className='button-container'>
                <img className='todo-icon' src='icons/today.svg'></img>
                    Today
            </button>
            <button className='button-container'>
                <img className='todo-icon' src='icons/week.svg'></img>
                    This Week
            </button>
        </div>
        
    )
}

export default UpcomingList