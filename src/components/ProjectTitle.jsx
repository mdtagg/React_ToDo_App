
import { useState } from 'react'

const ProjectTitle = ({title,id,setProjectId,projects,setProjects}) => {
    //title and id are attributes of each project, the rest are pieces of state

    //Toggle state in this section is responsible for changing the display of the delete button on each of the project folders when 
    //hovered over
    const [toggle,setToggle] = useState(false)

    //when the mouse enters a project tab toggle state is set to true which renders the x (delete button) on the right hand side 
    //of the project tab 
    function handleEnter() {
        setToggle(true)
    }

    //upon mouse exit the state is changed back to false 
    function handleExit() {
        setToggle(false)
    }

    //when the delete x is pressed the projects are filtered to all projects whose id does not match the id of the project with the 
    //delete button that has been pressed. The projects state is then set to those filtered projects. 
    function handleOnDelete(e) {
        const deleteId = e.target.dataset.id
        const filteredProjects = projects.filter(project => project.id !== deleteId)
        setProjects(filteredProjects)
    }

    //when a project is clicked in the sidebar, the projectId is set to the id of the project that was clicked. The current project
    //id has the name id to differetiate from the stateful projectId that is used in other components. 
    function handleOnClick(id) {
        setProjectId(id)
    }

    //Each project button is rendered with a project list image and a delete button if it is being hovered over. 
    return (
        <button className='project-button' onClick={() => handleOnClick(id)} onMouseEnter={handleEnter} onMouseLeave={handleExit}>
            <img className='todo-icon' src='icons/todo-list.svg'></img>
                {title}
            {toggle && 
            <div className='delete-button'>
                <div data-id={id} onClick={(e) => handleOnDelete(e)}>x</div>
            </div>
            }
        </button>
        )
}

export default ProjectTitle
