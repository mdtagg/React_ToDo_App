
import { useState } from 'react'
// import Form from 'react-bootstrap/Form';
import ProjectTab from './ProjectTab';
import { v4 as uuidv4 } from 'uuid';

const ProjectsList = ({projects,setProjects,setProjectId,filteredProject}) => {
    
    //toggles between the add new project form and button 
    const [toggleAddButton, setToggleAddButton] = useState(false)

    //used to capture the input in the project form 
    const [projectTitle,setProjectTitle] = useState('')

    const handleOnClick = () => {
        setToggleAddButton(true)
    }

    //when the form is submitted, toggle is set back to false and the projects state is set 
    //to all the projects in the projects state and a new project 
    const handleOnSubmit = (e) => {
        e.preventDefault()
        setToggleAddButton(false)
        setProjects((prevProjects) => {
            return ([
                ...prevProjects,
                projectTitle
            ])
        })
    }
    
    //Each time there is input in the add project form, the state of projectTitle is updated
    const handleInput = (e) => {
        const { value } = e.target
        setProjectTitle({
            title:value,
            type:'project',
            id: uuidv4(),
            todo:[]
        })
    }

    //If the project tab last clicked has a type of 'project' then the project tabs are rendered
    return (
        <section class='flex flex-col gap-3' >
            <h2 class='font-bold text-2xl'>Projects</h2>
            <div class='flex flex-col gap-2'>
            {projects.map(project => {
                if(project.type === 'project') {
                return (
                    <ProjectTab 
                        key={uuidv4()} 
                        setProjectId={setProjectId} 
                        setProjects={setProjects} 
                        projects={projects} 
                        title={project.title} 
                        id={project.id}
                        filteredProject={filteredProject}
                    />
                )
                }
            })}
            </div>
            <div class='mt-3'>
            {toggleAddButton && 
                <form onSubmit={handleOnSubmit}>
                    <input
                        class='w-full border-black border-2'
                        type='text' 
                        name='project-title' 
                        onChange={handleInput}
                    >
                    </input>
                    <div class='flex gap-2 text-white text-4 font-semibold mt-2'>
                        <button class='flex border-black rounded border-2 w-1/2 bg-green-500 justify-center' type='submit'>Add</button>
                        <button class='flex border-black border-2 rounded w-1/2 bg-red-500 justify-center' onClick={() => setToggleAddButton(false)}>Cancel</button>
                    </div>
                </form>
            }
            {!toggleAddButton &&
                <button class='flex items-center rounded gap-3 w-full border-rounded border-2 border-black p-1 bg-gray-100 hover:bg-gray-400 justify-center' onClick={handleOnClick}>
                    <img class='h-5' src='./icons/plus.svg'></img>
                    Add Project
                </button>}
            </div>
        </section>
    )
}

export default ProjectsList