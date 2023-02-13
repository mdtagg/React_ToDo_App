
const UpcomingList = () => {
    return (
        <div className='sidebar-group'>
            <button>
                <img className='todo-icon' src='icons/inbox.svg'></img>
                    Inbox
            </button>
            <button>
                <img className='todo-icon' src='icons/today.svg'></img>
                    Today
            </button>
            <button>
                <img className='todo-icon' src='icons/week.svg'></img>
                    This Week
            </button>
        </div>
        
    )
}

export default UpcomingList