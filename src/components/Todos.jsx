const Todos = () => {
    return (
        <main className='main'>
            <aside className='todo-sidebar'>
                <div className='sidebar-group'>
                    <button className='button-container'>
                        <img className='todo-icon' src='icons/inbox.svg'></img>
                            Inbox
                    </button>
                    <button className='button-container'>
                        <img className='todo-icon' src='icons/today.svg'></img>
                            Today
                    </button>
                    <button className='button-container'>
                        <img className='todo-icon' src='icons/week.svg'></img>
                            This Week
                    </button>
                </div>

                <div className='projects-title'>Projects</div>

                <div className='sidebar-group'>
                    
                    <button>
                        <img className='todo-icon' src='icons/todo-list.svg'></img>
                            test
                    </button>
                    <button>
                        <img className='todo-icon' src='icons/todo-list.svg'></img>
                            test two
                    </button>
                    <button>
                        <img className='todo-icon' src='icons/plus.svg'></img>
                            Add Project
                    </button>
                </div>
                    
            </aside>
            <div className='todo-list'></div>
        </main>
    )
}

export default Todos