import ProjectsList from "./ProjectsList"
import UpcomingList from "./UpcomingList"

const TodoSection = () => {
    return (
        <main className='main'>
            <aside className='todo-sidebar'>
                <UpcomingList/>
                {/* <div className='projects-title'>Projects</div> */}
                <ProjectsList/>
                    
            </aside>
            <div className='todo-list'></div>
        </main>
    )
}

export default TodoSection