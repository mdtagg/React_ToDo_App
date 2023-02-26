
import Header from "./components/Header";
import Dashboard from "./components/Dashboard"
import { useState } from "react";

function App() {

  //toggles between rendering the completed tasks and dashboard UI
  const [completed,setCompleted] = useState(false)

  return (
    <>
      <Header completed={completed} setCompleted={setCompleted} />
      <Dashboard completed={completed} />
      <footer>
          <h3>Developed by Michael Tagg</h3> 
          <a href='https://github.com/mdtagg'>
            <img className='todo-icon' src='./icons/github.svg'></img>
          </a>
      </footer>
    </>
    
  )
}

export default App
