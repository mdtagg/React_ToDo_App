
import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Temporal } from '@js-temporal/polyfill';
// import { ReactComponent as Inbox } from '/assets/icons/inbox.svg'
// import { ReactComponent as Week } from '/assets/icons/today.svg'
// import { ReactComponent as Month } from '/assets/icons/week.svg'

const UpcomingList = (props) => {

    //The upcoming tab id is set as the current projectId. All of the dates associated with each 
    //todo in each project are set as the state of dates
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

    //the following function is responsible for sorting the todos of each proejct into one of three
    //due categories, Today, This Week and This Month. Temporal library is used to simplify date
    //parsing
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
                    if(todo.date !== null) {
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

    //responsible for determining the start and end of the week from the current date
    const parseWeek = (currentDate,currentDay) => {
        let weekStart = currentDate.dayOfWeek
        weekStart !== 1 ? 
        weekStart = currentDay - weekStart :
        weekStart = currentDay
        const weekEnd = weekStart + 6
        return { weekStart,weekEnd }
    }

    return (
        <div class='flex flex-col'>
            <div class='font-bold text-2xl pb-4'>Upcoming</div>
            <div class='flex flex-col gap-2 items-center justify-center'>
            {props.projects.map(project => {
                if(project.type === 'upcoming') {
                    return (
                        <button 
                            class='flex items-center gap-3 w-full border-rounded p-1 bg-gray-100 border-2 border-black hover:bg-gray-500'
                            key={uuidv4()} 
                            data-id={project.id} 
                            onClick={(e) => handleClick(e)}
                        >
                            <img 
                                class='h-5 object-contain w-5' 
                                src={project.img}
                            >
                            </img>
                            <div>
                                {project.title}
                            </div>
                        </button>
                    )
                }
            })}
            </div>
        </div>
        
    )
}

export default UpcomingList
