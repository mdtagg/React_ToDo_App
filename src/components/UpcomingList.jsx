
import { useState,useEffect } from 'react'

const UpcomingList = (props) => {
    
    function handleOnClick(e) {

        const timeSection = e.target.attributes.value.value
        const currentDate = new Date()
        const parseMonth = currentDate.getMonth() + 1
        const parseCurrentDate = currentDate.toString().split(' ').slice(1,4)
        // console.log({currentDate,parseMonth,parseCurrentDate})
        
        let today = []
        let week = []
        let month = []

        props.dates.map(todoDate => {
            const { date } = todoDate
            const dateStr = date.split('/')
            const day = parseInt(dateStr[1])
            const currentDay = parseInt(parseCurrentDate[1])
            // console.log(parseInt(parseCurrentDate[1])

            if(day === parseInt(parseCurrentDate[1]) && parseMonth !== parseInt(parseCurrentDate[0])) {
                today.push(todoDate)
            }
            let weekStart = currentDay - (currentDay % 7)
            let weekEnd = weekStart + 7
            if(day >= weekStart && day < weekEnd) {
                week.push(todoDate)
            }
            if(parseMonth === parseInt(dateStr[0])) {
                month.push(todoDate)
            }
        })
        // console.log({today,week,month})
        props.setUpcomings({
            title:timeSection,
            reveal:true,
            today:today.length ? today : '',
            week:week.length ? week : '',
            month:month.length ? month : ''
        })
    }

    useEffect(() => {
        // console.log(props.upcomings.title)
        switch(props.upcomings.title) {
            case 'Today':
                props.setCurrentUpcoming(props.upcomings.today)
                break
            case 'This Week':
                props.setCurrentUpcoming(props.upcomings.week)
                break
            case 'This Month':
                props.setCurrentUpcoming(props.upcomings.month)
                break
        }
    },[props.upcomings])

    return (
        <div className='sidebar-group'>
            <div className='projects-title'>Upcoming</div>
            <button value='Today' onClick={(e) => handleOnClick(e)}>
                <img className='todo-icon' src='icons/inbox.svg'></img>
                    Today
            </button>
            <button value='This Week' onClick={(e) => handleOnClick(e)}>
                <img className='todo-icon' src='icons/today.svg'></img>
                    This Week
            </button>
            <button value='This Month' onClick={(e) => handleOnClick(e)}>
                <img className='todo-icon' src='icons/week.svg'></img>
                    This Month
            </button>
        </div>
        
    )
}

export default UpcomingList