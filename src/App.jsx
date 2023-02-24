
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
      <footer class='min-h-footer flex items-center justify-center bg-red-500 text-white gap-4 text-xl'>
          <div>Developed by Michael Tagg</div> 
          <a href='https://github.com/mdtagg'>
            <img class='h-5' src='./icons/github.svg'></img>
          </a>
      </footer>
    </>
      
    
  )
}

export default App
