
import { useState,useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ProjectTitle from './ProjectTitle';
import { v4 as uuidv4 } from 'uuid';

const ProjectsList = ({projects,setProjects,setId,setUpcomings}) => {
    
    const [toggleShow, setToggleShow] = useState(false)
    const [projectTitle,setProjectTitle] = useState('')

    function handleOnClick() {
        setToggleShow(true)
    }

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

    function handleInput(e) {
        const { value } = e.target
        setProjectTitle({
            title:value,
            id: uuidv4(),
            todo:[]
        })
    }

    return (
        <div className='sidebar-group' id='projects-list'>
            <div className='projects-title'>Projects</div>
            {projects.map((project,index) => {
                return (
                    <ProjectTitle setUpcomings={setUpcomings} setId={setId} setProjects={setProjects} projects={projects} id={project.id} key={index} title={project.title} />
                )
            })}
            {toggleShow && 
                <Form onSubmit={handleOnSubmit}>
                    <Form.Control type='text' name='project-title' onChange={handleInput}/>
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