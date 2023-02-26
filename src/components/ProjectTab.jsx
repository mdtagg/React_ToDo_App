
import { useState } from 'react'

const ProjectTab = ({title,id,setProjectId,projects,setProjects,filteredProject}) => {

    //Responsible for changing the display of the delete button on hover
    const [toggle,setToggle] = useState(false)

    const handleEnter = () => {
        setToggle(true)
    }

    const handleExit = () => {
        setToggle(false)
    }

    //when a project is deleted filtered project is set to empty so that todos are not rendered from
    //an undefined project. The project to be deleted is then filtered and projects state is set 
    const handleOnDelete = (e) => {
        filteredProject = ''
        const deleteId = e.target.dataset.id
        const filteredProjects = projects.filter(project => project.id !== deleteId)
        setProjects(filteredProjects)
        setProjectId('')
    }

    //responsible for setting the id of last clicked project tab 
    const handleOnClick = (id) => {
        setProjectId(id)
    }

    return (
        <button 
            class='flex justify-between items-center rounded gap-3 w-full border-rounded border-2 border-black p-1 bg-gray-100 hover:bg-gray-500' 
            onClick={() => handleOnClick(id)} 
            onMouseEnter={handleEnter} 
            onMouseLeave={handleExit}
        >
            <div class='flex items-center gap-3'>
                <img class='h-5'src='./icons/todo-list.svg'></img>
                <div>{title}</div>
            </div>
            
            {toggle && 
            <div class='flex justify-end font-bold cursor-pointer'>
                <div data-id={id} onClick={(e) => handleOnDelete(e)}>x</div>
            </div>
            }
        </button>
        )
}

export default ProjectTab
