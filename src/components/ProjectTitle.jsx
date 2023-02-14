
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
        const filteredProjects = projects.filter(item => item.id !== id)
        setProjects(filteredProjects)
    }

    return (
            <button onMouseEnter={handleEnter} onMouseLeave={handleExit}>
                <img className='todo-icon' src='icons/todo-list.svg'></img>
                    {title}
                {toggle && <div onClick={() => handleOnDelete(id)} className='delete-button'>x</div>}
            </button>
        )
}

export default ProjectTitle
