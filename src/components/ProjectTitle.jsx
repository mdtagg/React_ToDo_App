
import { useState } from 'react'

const ProjectTitle = ({title,id}) => {

    const [toggle,setToggle] = useState(false)

    function handleEnter() {
        setToggle(true)
    }

    function handleExit() {
        setToggle(false)
    }

    return (
            <button onMouseEnter={handleEnter} onMouseLeave={handleExit}>
                <img className='todo-icon' src='icons/todo-list.svg'></img>
                    {title}
                {toggle && <div onClick={() => handleDelete(id)} className='delete-button'>x</div>}
            </button>
        )
}

export default ProjectTitle
