import React, { useState } from 'react';
import Header from '../components/header'
import Footer from '../components/footer';
import classNames from 'classnames';
import '../app.css';


export default function Todo(){ 
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [Checked, setChecked] = useState(false);

  function addTask(taskText) {
    let newTask = {
      id: Date.now(),
      text: taskText,
      completed: false

    }
    

    setTasks(prevTasks => 
      {let newArray = prevTasks.slice(); 
        newArray.push(newTask)
      
      localStorage.setItem('task', JSON.stringify(newArray))
      return newArray


    })
    
  }
    
    
  function checkTask(id, event){
    
    setTasks(prevTasks => {
      
      let newArray = prevTasks.slice()
      return newArray.map( task =>{
        if (task.id === id)
          task.completed = !task.completed
        return task
      }
      
      

      )
      
    })
  }
    

    


  function removeTask(taskId) {
    
    
    setTasks(prevTasks => {
    let newArray = prevTasks.slice()
    let index = newArray.findIndex(task => task.id === taskId)
    if (index !==-1){
      newArray.splice(index,1);
    
    }
    localStorage.setItem('task', JSON.stringify(newArray))
    return newArray
  })
}
  
  

  
/* java script  functions */
    



  



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
            <button type="submit" className='coolColoredButtons'> Add Task</button>
          </form>
        </section>
        <section>
          <h2 className = "task-create"> Your Tasks </h2>
          <section className ="task-create">
            {tasks.map((task) => (
              <div key={task.id}
              className = {classNames('task-item', {
                  'completedTask': task.completed,
                   'not-completed':!task.completed})}>
                <span>{task.text}</span>
                <input type="checkbox" id={task.id} checked = {task.completed} onChange={() => checkTask(task.id)} className = "checkboxTask lessPaddingOnTheSides"/>
                <button onClick = {() =>removeTask(task.id)} className = "reduceTextSizeAndRoundedBorders coolColoredButtons lessPaddingOnTheSides"> Remove </button>
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


  

