import { Temporal } from "@js-temporal/polyfill"
import { v4 as uuidv4 } from 'uuid';

const TaskTab = ({filteredProject,setProjectTodos,setCompletedList,projectTodos}) => {

    const handleOnDelete = (e) => {
        const value = e.target.dataset.id
        const filteredTodos = projectTodos.filter(todo => todo.id !== value )
        setProjectTodos(filteredTodos)
    }

    //changes the date output to a format easier for parsing. When a date is entered its is then 
    //added to the associated todo which triggers a change in the projectTodos state. This then 
    //triggers an update to the projects state
    function handleDateChange(e) {
        const dateId = e.target.dataset.id
        const dateValue = parseDay(e.target.value.split('-'))
        setProjectTodos((prevTodos) => {
            return prevTodos.map(todo => {
                if(todo.id === dateId) {
                    return ({
                        ...todo,
                        date:dateValue
                    })
                }else {
                    return todo
                }
            })
        })
    }

    const parseDay = (day) => {
        let temp = ''
        temp = day.shift()
        day.push(temp)
        return day.join('/')
    }

    //the project title is added to the filtered todo and the completedList state is updated to that 
    //filtered todo
    const handleCheckbox = (e) => {
        const currentDate = Temporal.Now.plainDateISO()
        const currentDay = parseDay(currentDate.toString().split('-'))
        const taskId = e.target.dataset.id
        const [filteredTodo] = filteredProject.todo.filter(todo => taskId === todo.id)
        filteredTodo.projectTitle = filteredProject.title
        filteredTodo.currentDate = currentDay
        setCompletedList((prevList) => {
            return [
                ...prevList,
                filteredTodo
            ]
        })
        handleOnDelete(e)
    }

    return (
        <>
        {!filteredProject.todo.length && filteredProject.type === 'upcoming' &&
        <div className='text-4xl m-auto'>Nothing Due</div>} 

        <div>
        {filteredProject.todo.map(todo => {
            return (
                <form key={uuidv4()} class='flex mb-2 bg-gray-300 p-2 justify-between items-center'>
                    <input 
                        class='grow h-5'
                        data-id={todo.id}
                        type='checkbox' 
                        onClick={(e) => handleCheckbox(e)} 
                    />
                    <p class='w-1/2 grow m-0'>
                        {todo.title}
                    </p>
                    {todo.date === null && 
                        <input 
                            data-id={todo.id} 
                            class='grow border-black rounded-sm border-2 bg-white' 
                            type='date' 
                            onChange={(e) => handleDateChange(e)}
                        >
                        </input>
                    }
                    {todo.date !== null && 
                        <p className='border-black grow inline border-2 bg-white rounded-sm text-center cursor-pointer m-0'>
                            {todo.date}
                        </p>
                    }
                    {filteredProject.type !== 'upcoming' && 
                    <div class='grow flex font-bold justify-end' >
                        <button data-id={todo.id} onClick={(e) => handleOnDelete(e)}>
                            x
                        </button>
                    </div>}
                </form>
            )
        })}
        </div>
        </>
    )
}

export default TaskTab