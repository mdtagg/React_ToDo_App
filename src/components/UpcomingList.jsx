

const UpcomingList = (props) => {
    
    function handleOnClick(e) {
        const timeSection = e.target.attributes.value.value
        props.setUpcomings({
            title:timeSection,
            reveal:true
        })
    }

    return (
        <div className='sidebar-group'>
            <div className='projects-title'>Upcoming</div>
            <button value='Today' onClick={(e) => handleOnClick(e)}>
                <img className='todo-icon' src='icons/inbox.svg'></img>
                    Today
            </button>
            <button>
                <img className='todo-icon' src='icons/today.svg'></img>
                    This Week
            </button>
            <button>
                <img className='todo-icon' src='icons/week.svg'></img>
                    This Month
            </button>
        </div>
        
    )
}

export default UpcomingList