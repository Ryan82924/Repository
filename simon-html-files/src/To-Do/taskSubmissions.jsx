import React, { useState } from 'react';
import '../app.css';

export default function TaskSubmission({setTasks,taskText,setTaskText}){
    


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
          setTaskText("")
          return newArray
          
    
    
        })
        
      }
    return(
    <section>

          
          <h2 className = "task-create"> Create a new task </h2>
          <form className = "task-create" method = "post" onSubmit={(e) => {e.preventDefault(); addTask(taskText)}}>
            <label htmlFor ="task-input">Task:</label>
            <input type="text" id="task-input" name="task" value = {taskText} onChange={(e) => setTaskText(e.target.value)} required/>
            <button type="submit" className='coolColoredButtons'> Add Task</button>
          </form>
        </section>
    )

}