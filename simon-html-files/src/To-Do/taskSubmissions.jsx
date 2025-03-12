import React, { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import '../app.css';

export default function TaskSubmission({setTasks,taskText,setTaskText}){
    


    function addTask(taskText) {
        let newTask = {
          id: uuidv4(),
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


async function passbackTask(endpoint){

  
    
    const response = await fetch(`${endpoint}`, {

      

    method: 'POST',
      body: JSON.stringify({ task: taskText,}),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
    
      }
      
    })
    const data = await response.json(); 
    if (response?.status === 200){
      setTasks(data.tasks);
      console.log(data)
      
        

    }else{
      console.log(data)

    }
  }
    return(
    <section>

          
          <h2 className = "task-create"> Create a new task </h2>
          <form className = "task-create" method = "post" onSubmit={(e) => {e.preventDefault(); passbackTask('/api/tasks')}}>
            <label htmlFor ="task-input">Task:</label>
            <input type="text" id="task-input" name="task" value = {taskText} onChange={(e) => setTaskText(e.target.value)} required/>
            <button type="submit" className='coolColoredButtons'> Add Task</button>
          </form>
        </section>
    )

}