import React, { useState } from 'react';
import Header from '../components/header'
import Footer from '../components/footer';
import '../app.css';


export default function Todo(){ 
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");

  function addTask(taskText) {
    
    let newTask = {
      id: Date.now(),
      text: taskText,
      completed: false

    }
    setTasks(prevTask => [...prevTask, newTask]);
    setTaskText("");
  function checkTask(id){
    let task = tasks.find(task => task.id === id)
      if (task.completed === true)
        return true
      else{
        return false
      }

  }

  

  
/* java script  functions */
    



  }



  /* end java script functions */



    return (
      <div className='fullpage'>
      <Header />
      <main>
        <section>
          <h2 className = "task-create"> Create a new task </h2>
          <form className = "task-create" method = "post" action="/add-task" onSubmit={(e) => {e.preventDefault(); addTask(taskText)}}>
            <label htmlFor ="task-input">Task:</label>
            <input type="text" id="task-input" name="task" value = {taskText} onChange={(e) => setTaskText(e.target.value)} required/>
            <button type="submit"> Add Task</button>
          </form>
        </section>
        <section>
          <h2 className = "task-create"> Your Tasks </h2>
          <section className ="task-create">
            {tasks.map((task) => (
              <div key={task.id}
              className = {classNames('task-item', {
                  'completed': task.completed,
                   'not-completed':!task.completed})}>
                <span>{task.text}</span>
                <input type="checkbox" id={task.id} checked = {task.completed} onChange={() => checkTask(task.id)}/>
              </div>

            ))}
            </section>
            </section>
            
            
            
            
            
            
            {/*<div className = "task-item"> 
              <span> Task 1 (placeholder for tasks pulled from database)</span>
              
            </div>
            <p className = "less-spacing"> Fun Fact (pulled from third party api) </p>
            <p id = "third-party-api-placeholder"></p>
            <div className = "task-item">
              <span> Task 2 (placeholder for tasks pulled from database)</span>
              <input type="checkbox" id="task2"/>
            </div>
            <p className = "less-spacing"> Fun Fact (pulled from third party api) </p>
            <p id = "third-party-api-placeholder"></p>
            <div className = "task-item">        
              <span> Task 3 (placeholder for tasks pulled from database) </span>
              <input type="checkbox" id="task3" />
            </div>
            <p className = "less-spacing"> Fun Fact (pulled from third party api) </p>
            <p id = "third-party-api-placeholder"></p>
          </section>
         </section> */}
  
          
            
  
          
        
        
        
        </main>
    <Footer/>
    </div>
    )
  }
      
  




    