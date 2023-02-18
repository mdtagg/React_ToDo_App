
import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ProjectTitle from './ProjectTitle';
import { v4 as uuidv4 } from 'uuid';

const ProjectsList = ({projects,setProjects,setProjectId}) => {
    
    //toggle show toggles the add new project form and add new project button 
    const [toggleShow, setToggleShow] = useState(false)

    //project title is used to capture the input in the project form for later use 
    const [projectTitle,setProjectTitle] = useState('')

    //when add project is clicked toggle is set to true, which displays the input form 
    function handleOnClick() {
        setToggleShow(true)
    }

    //when the form is submitted toggle is set back to false and projects is set to all the projects in the projects state and 
    //a new project with the project title from the projectTitle state
    function handleOnSubmit(e) {
        e.preventDefault()
        setToggleShow(false)
        setProjects((prevProjects) => {
            return ([
                ...prevProjects,
                projectTitle
            ])
        })
    }
    

    //Each time there is input in the add project form, the state of projectTitle is changed to the input value along with a unique
    //id and a todo property set to an empty array 
    function handleInput(e) {
        const { value } = e.target
        setProjectTitle({
            title:value,
            type:'project',
            id: uuidv4(),
            todo:[]
        })
    }

    //Here we are rendering the projects section of the sidebar which includes the title, each of the titles of the projects and 
    //either the add project button or the add project form, depending on which toggle state is active
    return (
        <div className='sidebar-group' id='projects-list'>
            <div className='projects-title'>Projects</div>
            {projects.map(project => {
                if(project.type === 'project') {
                return (
                    <ProjectTitle 
                        setProjectId={setProjectId} 
                        setProjects={setProjects} 
                        projects={projects} 
                        key={uuidv4()} 
                        title={project.title} 
                        id={project.id}
                    />
                )
                }
            })}
            {toggleShow && 
                <Form onSubmit={handleOnSubmit}>
                    <Form.Control 
                        type='text' 
                        name='project-title' 
                        onChange={handleInput}
                    />
                    <div className='button-group'>
                        <Button variant='success' type='submit' size='sm'>Add</Button>
                        <Button variant='danger' size='sm'>Cancel</Button>
                    </div>
                </Form>
            }
            {!toggleShow &&
            <button onClick={handleOnClick}>
                <img className='todo-icon' src='icons/plus.svg'></img>
                Add Project
            </button>
            }
        </div>
    )
}

export default ProjectsList