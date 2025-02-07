import React, { useState } from 'react';
import classNames from 'classnames';
import '../app.css';

export default function TaskItem({setTasks, tasks}){

    function checkTask(id){
    
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



    return (
        <section>
                  <h2 className = "task-create"> Your Tasks </h2>
                  <section className ="task-create">
                    {tasks.map((task) => (
                      <div key={task.id}
                      className = {classNames('task-item', {
                          'completedTask': task.completed,
                           'not-completed':!task.completed})}>
                        <span>{task.text}</span>
                        
                        <input type="checkbox" id={task.id} checked = {task.completed} onChange={() => {console.log("uwiqbiuwqw"); checkTask(task.id)}} className = "checkboxTask lessPaddingOnTheSides"/>
                        
                        <button onClick = {() =>removeTask(task.id)} className = "reduceTextSizeAndRoundedBorders coolColoredButtons lessPaddingOnTheSides"> Remove </button>
                      </div>
        
                    ))}
                    </section> 
                  </section>
    )

}