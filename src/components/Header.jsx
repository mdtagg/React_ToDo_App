
const Header = (props) => {

    const handleClick = () => {
        props.setCompleted((prevState) => {
            return !prevState
        })
    }

    return (
        <header class='bg-red-500 flex flex-row justify-between align-center text-white text-4xl p-8 h-header'>
            <div>Todo List</div>
            <div>
                <button onClick={handleClick}  class='text-xl border-2 border-black bg-neutral-300 text-black flex items-center gap-2 p-2  hover:bg-slate-500' >
                    {!props.completed && 
                    <>
                        <img class='h-5' src='./icons/check.svg'></img>
                        View Completed Tasks
                    </>
                    }
                    {props.completed &&
                    <>
                        <img class='h-5' src='./icons/back.svg' ></img>
                        Back To Menu
                    </>
                    }
                </button>
            </div>
        </header>
    )
    
}

export default Header