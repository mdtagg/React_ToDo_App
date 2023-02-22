
import Header from "./components/Header";
import Dashboard from "./components/Dashboard"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";

function App() {

  //toggles between rendering the completed tasks and tasks list UI
  const [completed,setCompleted] = useState(false)

  return (
    <>
      <Header completed={completed} setCompleted={setCompleted} />
      <Dashboard completed={completed} />
      <footer>Developed by Michael Tagg 
          
          <a href='https://github.com/mdtagg'><img className='todo-icon' src='./icons/github.svg'></img></a>
      </footer>
    </>
    
  )
}

export default App
