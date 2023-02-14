
import { useState } from 'react'

const ProjectTitle = ({title,id,projects,setProjects}) => {

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

    function handleOnClick(e) {
   
        
        // console.log(projects)
    }

    return (
        <button className='project-button' onClick={(e) => handleOnClick(e)} onMouseEnter={handleEnter} onMouseLeave={handleExit}>
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
