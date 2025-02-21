import React, { useState } from 'react';
import '../app.css';

export default function TaskItem({setTasks, tasks, setScore, score, funFact,setFunFact}){
  function thirdPartyAPI(id){
    setFunFact(prevFunFact => { 
      return {
      ...prevFunFact,
    [id]:"this is a hardcoded fun fact"}})
  }

    function checkTask(id){
    
        setTasks(prevTasks => {
          
          let newArray = prevTasks.slice()
          let updatedArray = newArray.map( task =>{
            if (task.id === id)
              {
                let prevComplete = task.completed
                task.completed = !task.completed
                

              if (!prevComplete){
                setScore(prevScore => {
                  prevScore = prevScore+1
                  console.log(prevScore)
                  localStorage.setItem('score', JSON.stringify(prevScore)) 
                  
                  return prevScore
                })
              }
              if (prevComplete){
                setScore(prevScore=> {
                  prevScore = prevScore-1
                  console.log(prevScore)
                  localStorage.setItem('score', JSON.stringify(prevScore))
                  return prevScore
                  
                })
              }
            } 


            

            

            return task
          }); localStorage.setItem('task', JSON.stringify(updatedArray)
        ) 
           
        return updatedArray;
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
                      <div><div key={task.id}
                        className={task.completed ? 'completedTask' : 'task-item'}>
                        <span>{task.text}</span>

                        <input type="checkbox" id={task.id} checked={task.completed} onChange={() => { console.log(funFact[task.id]); checkTask(task.id); thirdPartyAPI(task.id); } } className="checkboxTask lessPaddingOnTheSides" />




                        <button onClick={() => removeTask(task.id)} className="reduceTextSizeAndRoundedBorders coolColoredButtons lessPaddingOnTheSides"> Remove </button>
                      </div><div>{task.completed ? <p className="less-spacing">{funFact[task.id]}</p> : null}</div></div>
        
                    ))}
                    </section> 
                  </section>
    )

}