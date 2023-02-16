
import { useState } from 'react'

const ProjectTitle = ({title,id,projects,setProjects,setId,setUpcomings}) => {

    const [toggle,setToggle] = useState(false)

    function handleEnter() {
        setToggle(true)
    }

    function handleExit() {
        setToggle(false)
    }

    function handleOnDelete(id) {
        const filteredProjects = projects.filter(project => project.id !== id)
        setProjects(filteredProjects)
    }

    function handleOnClick(id) {
        setId(id)
        setUpcomings((prevUpcomings) => {
            return {
                ...prevUpcomings,
                reveal:false
            }
        })
    }

    return (
        <button className='project-button' onClick={() => handleOnClick(id)} onMouseEnter={handleEnter} onMouseLeave={handleExit}>
            <img className='todo-icon' src='icons/todo-list.svg'></img>
                {title}
            {toggle && 
            <div className='delete-button'>
                <div onClick={() => handleOnDelete(id)}>x</div>
            </div>
            }
        </button>
        )
}

export default ProjectTitle
