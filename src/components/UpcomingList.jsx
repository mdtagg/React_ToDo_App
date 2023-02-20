
import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Temporal } from '@js-temporal/polyfill';

const UpcomingList = (props) => {

    const handleClick = (e) => {
        const filteredUpcomingTab = e.target.dataset.id
        props.setProjectId(filteredUpcomingTab)
        let dates = []
        props.projects.forEach(project => {
            project.todo.forEach(todo => {
                dates.push(todo.date)
            })
        })
        props.setDates(dates)
    }

    useEffect(() => {
        const currentDate = Temporal.Now.plainDateTimeISO()
        let currentDay = currentDate.day
        let currentWeekRange = parseWeek(currentDate,currentDay)
        let currentMonth = currentDate.month
        let todayTasks = []
        let weekTasks = []
        let monthTasks = []

        props.projects.forEach(project => {
            if(project.type === 'project') {
                project.todo.forEach(todo => {
                    let todoDateInfo = todo.date.split('/')
                    let todoDay = parseInt(todoDateInfo[1])
                    let todoMonth = parseInt(todoDateInfo[0])
                    if(todoDay === currentDay) {
                        todayTasks.push(todo)
                    }
                    if(todoDay >= currentWeekRange.weekStart && 
                        todoDay <= currentWeekRange.weekEnd) {
                        weekTasks.push(todo)
                        }
                    if(todoMonth === currentMonth) {
                        monthTasks.push(todo)
                    }
                })
            }
        })
        props.setProjects((prevProjects) => {
            return prevProjects.map(project => {
                if(project.type === 'upcoming') {
                    switch(project.title) {
                        case 'Today':
                            project.todo = todayTasks
                            break
                        case 'This Week':
                            project.todo = weekTasks
                            break
                        case 'This Month':
                            project.todo = monthTasks
                            break
                    }
                }
                return project
            })
        })
        
    },[props.dates])

    const parseWeek = (currentDate,currentDay) => {
        let weekStart = currentDate.dayOfWeek
        weekStart !== 1 ? 
        weekStart = currentDay - weekStart :
        weekStart = currentDay
        const weekEnd = weekStart + 6
        return { weekStart,weekEnd }
    }

    return (
        <div className='sidebar-group'>
            <div className='projects-title'>Upcoming</div>
            {props.projects.map(project => {
                if(project.type === 'upcoming') {
                    return (
                        <button key={uuidv4()} data-id={project.id} onClick={(e) => handleClick(e)}>
                            <img className='todo-icon' src={project.img}></img>
                            {project.title}
                        </button>
                    )
                }
            })}
        </div>
        
    )
}

export default UpcomingList
