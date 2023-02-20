
import Header from "./components/Header";
import Dashboard from "./components/Dashboard"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";

function App() {

  const [completed,setCompleted] = useState(false)

  return (
    <>
      <Header completed={completed} setCompleted={setCompleted} />
      <Dashboard completed={completed} />
      <footer>Designed by Michael Tagg</footer>
    </>
    
  )
}

export default App
