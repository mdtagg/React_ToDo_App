
import Dashboard from "./components/Dashboard"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
      <header className='header'>
        <div>Todo List</div>
        <div>
          <button className='completed-tasks-button'>
            <div><img className='todo-icon' src='./icons/check.svg'></img></div>
            <div>View Completed Tasks</div>
          </button>
        </div>
      </header>
      <Dashboard />
      <footer>Designed by Michael Tagg</footer>
    </>
    
  )
}

export default App
