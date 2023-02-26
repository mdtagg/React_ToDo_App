
const Header = (props) => {

    const handleClick = () => {
        props.setCompleted((prevState) => {
            return !prevState
        })
    }

    return (
        <header class='bg-red-500 flex flex-row justify-between items-center text-white text-4xl p-8 h-header'>
            <h1 class='font-kalam m-0'>Todo List</h1>
            <div>
                <button onClick={handleClick}  class='text-xl border-2 border-black rounded bg-gray-100 text-black flex items-center gap-2 p-2  hover:bg-gray-400' >
                    {!props.completed && 
                    <>
                        <img class='h-5' src='./icons/check.svg'></img>
                        <p class='m-0'>View Completed Tasks</p>
                    </>
                    }
                    {props.completed &&
                    <>
                        <img class='h-5' src='./icons/back.svg' ></img>
                        <p class='m-0'>Back To Menu</p>
                    </>
                    }
                </button>
            </div>
        </header>
    )
    
}

export default Header