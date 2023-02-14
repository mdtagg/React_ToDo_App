
import { useState,useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ProjectTitle from './ProjectTitle';
import { v4 as uuidv4 } from 'uuid';

const ProjectsList = () => {
    const [projects, setProjects] = useState(['test','test two'])
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
        setProjectTitle(value)
    }

    function handleOnDelete(id) {
        
    }

    return (
        <div className='sidebar-group' id='projects-list'>
            <div className='projects-title'>Projects</div>
            {projects.map((project,index) => {
                return (
                    <ProjectTitle id={uuidv4()} key={index} title={project} />
                )
            })}
            {toggleShow && 
                <Form onSubmit={handleOnSubmit}>
                    <Form.Control type='text' name='project-title' onChange={handleInput}/>
                    <Button variant='success' type='submit' size='sm'>Add</Button>
                    <Button variant='danger' size='sm'>Cancel</Button>
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