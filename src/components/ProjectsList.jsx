
import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const ProjectsList = () => {
    // <div className='add-todo-container'>
    //             <input></input>
    //             <div className='add-todo-buttons'>
    //                 <Button variant='success' size='sm' type='submit' onSubmit={handleOnSubmit}>Add</Button>
    //                 <Button variant='danger' size='sm'>Cancel</Button>
    //             </div>
    //         </div>
    const [projects, setProjects] = useState([])
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

    return (
        <div className='sidebar-group' id='projects-list'>
            <div className='projects-title'>Projects</div>
            <button>
                <img className='todo-icon' src='icons/todo-list.svg'></img>
                    test
            </button>
            <button>
                <img className='todo-icon' src='icons/todo-list.svg'></img>
                    test two
            </button>
            {projects.map(project => {
                return (
                <button>
                <img className='todo-icon' src='icons/todo-list.svg'></img>
                    {project}
                </button>
                )
            })}
            {toggleShow && 
                <Form onSubmit={handleOnSubmit}>
                    <Form.Control type='text' name='project-title' onChange={handleInput}/>
                    <Button variant='success' type='submit'>Add</Button>
                    <Button variant='danger'>Cancel</Button>
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