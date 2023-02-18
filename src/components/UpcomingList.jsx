
import { useEffect,useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

const UpcomingList = (props) => {

    const handleClick = (e) => {
        const filteredUpcomingTab = e.target.dataset.id
        props.setProjectId(filteredUpcomingTab)
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

{/* <button value='Today' onClick={(e) => handleOnClick(e)}>
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
            </button> */}

// function handleOnClick(e) {

    //     const timeSection = e.target.attributes.value.value
    //     const currentDate = new Date()
    //     const parseMonth = currentDate.getMonth() + 1
    //     const parseCurrentDate = currentDate.toString().split(' ').slice(1,4)
        
    //     let today = []
    //     let week = []
    //     let month = []
    //     let todoTitles = []

    //     //temporal library
    //     props.dates.map(todoDate => {
    //         props.projects.forEach(project => {
    //             let projectTitle = project.title
    //             project.todo.forEach(todo => {
    //                 if(todo.id === todoDate.id) {
    //                     todoTitles.push(`${todo.title} (${projectTitle})`)
    //                 }
    //             })
    //         })
    //         const { date } = todoDate
    //         const dateStr = date.split('/')
    //         const day = parseInt(dateStr[1])
    //         const currentDay = parseInt(parseCurrentDate[1])

    //         if(day === parseInt(parseCurrentDate[1]) && parseMonth !== parseInt(parseCurrentDate[0])) {
    //             today.push(todoDate)
    //         }
    //         let weekStart = currentDay - (currentDay % 7)
    //         let weekEnd = weekStart + 7
    //         if(day >= weekStart && day < weekEnd) {
    //             week.push(todoDate)
    //         }
    //         if(parseMonth === parseInt(dateStr[0])) {
    //             month.push(todoDate)
    //         }
    //     })
     
    //     props.setUpcomings({
    //         title:timeSection,
    //         reveal:true,
    //         today:today.length ? today : '',
    //         week:week.length ? week : '',
    //         month:month.length ? month : '',
    //         todoTitles:todoTitles.length ? todoTitles : ''
    //     })
    // }

    // useEffect(() => {
        
    //     switch(props.upcomings.title) {
    //         case 'Today':
    //             props.setCurrentUpcoming(props.upcomings.today)
    //             break
    //         case 'This Week':
    //             props.setCurrentUpcoming(props.upcomings.week)
    //             break
    //         case 'This Month':
    //             props.setCurrentUpcoming(props.upcomings.month)
    //             break
    //     }
    // },[props.upcomings])