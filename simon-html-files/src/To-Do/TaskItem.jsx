import React, { useEffect, useState } from 'react';
import '../app.css';

export default function TaskItem({setTasks, tasks, setScore, score, funFact,setFunFact}){
  
  async function callThirdParty(){
    const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en',{
    method: 'GET',
      headers: {
        "Accept": "application/json"

    


  },

})
const data = await response.json()
if (response?.status === 200){
  return data.text
} 
else{
  console.log(data)
}

}
  async function thirdPartyAPI(id){
    let resultFact = await callThirdParty()
    setFunFact(prevFunFact => { 
      return {
      ...prevFunFact,
    [id]: resultFact}})
  }

    function checkTask(id){
    
        setTasks(prevTasks => {
          
          let newArray = prevTasks.slice()
          let updatedArray = newArray.map( task =>{
            if (task.id === id)
              {
                let prevComplete = task.completed
                task.completed = !task.completed
                fetch('/api/completed',{
                  method: 'POST',
                  body: JSON.stringify({ id: task.id, completed: task.completed,}),

                  headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                
                  }
                  
                })

              if (!prevComplete){
                setScore(prevScore => {
                  prevScore = prevScore+1
                  console.log(prevScore)
                  localStorage.setItem('score', JSON.stringify(prevScore)) 
                  fetch(`/api/score/${id}`, {
  
                    method: 'POST',
                      body: JSON.stringify({ id, score: prevComplete ? -1 : +1 ,}),
                      
                      headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    
                      }
                      
                    })
                  return prevScore
                })
              }
              if (prevComplete){
                setScore(prevScore=> {
                  prevScore = prevScore-1
                  console.log(prevScore)
                  localStorage.setItem('score', JSON.stringify(prevScore))
                  
                  fetch(`/api/score/${id}`, {
  
                    method: 'POST',
                      body: JSON.stringify({ id, score: prevComplete ? -1 : +1,}),
                      
                      headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    
                      }
                      
                    })
                  return prevScore
                  
                })
              }
            } 

            

            
            
            return task
          }); 

          
          
          return updatedArray
      })
      
      
    }
    useEffect(()=>{
      localStorage.getItem('score', JSON.stringify(score))
    }, [score])
        
   

        
    
    
    /*function removeTask(taskId) {
        
        
        setTasks(prevTasks => {
        
        let newArray = prevTasks.slice()
        let index = newArray.findIndex(task => task.id === taskId)
        if (index !==-1){
          newArray.splice(index,1);
        
        }
        localStorage.setItem('task', JSON.stringify(newArray))
        return newArray
    })
    }*/


    
  

    async function passbackremoveTask(taskId, endpoint){
      console.log("Inside passbackremovetask", taskId);
      setTasks((prevTasks)=>prevTasks.filter(task => task.id !== taskId))
     
    
      const response = await fetch(`${endpoint}/${taskId}`, {
  
      method: 'DELETE',
        
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
      
        }
        
      })
      const data = await response.json(); 
      if (response?.status === 200){
        setTasks(data.tasks);
        console.log("the taskId is", taskId)
        console.log(data)
        
          
  
      }else{
        console.log(data)
  
      }
    }




    return (
        <section>
                  <h2 className = "task-create"> Your Tasks </h2>
                  <section className ="task-create">
                  {Array.isArray(tasks) ? tasks.map((task) => (

                      <div><div key={task.id}
                        className={task.completed ? 'completedTask' : 'task-item'}>
                        <span>{task.text}</span>

                        <input type="checkbox" id={task.id} checked={task.completed} onChange={() => { console.log(funFact[task.id]); checkTask(task.id); thirdPartyAPI(task.id); } } className="checkboxTask lessPaddingOnTheSides" />




                        <button onClick={() => passbackremoveTask(task.id, '/api/remove/tasks')} className="reduceTextSizeAndRoundedBorders coolColoredButtons lessPaddingOnTheSides"> Remove </button>
                      </div><div>{task.completed ? <p className="less-spacing">{funFact[task.id]}</p> : null}</div></div>
        
                    )) :<p> Add some tasks! </p>
                  }
                    </section> 
                  </section>
    )

}