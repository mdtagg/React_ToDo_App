
import { useState } from 'react'

const UpcomingList = (props) => {

    // const [todayTasks,setTodayTasks] = useState([])
    // const [weekTasks,setWeekTasks] = useState([])
    // const [monthTasks,setMonthTasks] = useState([])
    
    function handleOnClick(e) {

        const timeSection = e.target.attributes.value.value
        let currentDate = new Date().toString().split(' ').slice(1,4)
        const todayTasks = props.dates.filter(date => {
            let taskDate = date.date.split('-')
            // console.log(taskDate)
            let currentDay = parseInt(currentDate[1])
            // console.log(currentDay)
            let taskDay = parseInt(taskDate[2])
            if(currentDay === taskDay) return true
        })

        const monthTasks = props.dates.filter(date => {
            let taskDate = date.date.split('-')
            let currentMonth = parseInt(currentDate[2])
            let taskMonth = parseInt(taskDate[1])
            if(currentMonth === taskMonth) return true
        })
        props.setUpcomings({
            title:timeSection,
            reveal:true,
            today:todayTasks,
            month:monthTasks
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