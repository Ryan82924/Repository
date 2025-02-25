import React, { useState } from 'react';
import Header from '../components/header'
import Footer from '../components/footer';
import  TaskItem  from './TaskItem';
import TaskSubmission from './taskSubmissions'
import classNames from 'classnames';
import '../app.css';


export default function Todo(){ 
  const [tasks, setTasks] = useState(()=>{
    const storedTasks= localStorage.getItem('task')
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [taskText, setTaskText] = useState("");
  const [Checked, setChecked] = useState(false);
  const [score, setScore] = useState( 0 );
  const [funFact, setFunFact] = useState("Placeholder for API, hardcoded for now.");

  
    

    


 
  
  

  
/* java script  functions */
    



  



  /* end java script functions */



    return (
      <div className='fullpage'>
      <Header />
      <main>

      
        
        
        <TaskSubmission setTasks = {setTasks} taskText = {taskText} setTaskText = {setTaskText}/>



        {/*<section>
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
          </section> */}
          
            
            
            
            
            
            
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
         <TaskItem setTasks={setTasks} tasks= {tasks} setScore={setScore} score={score} funFact={funFact} setFunFact={setFunFact}/>
  
          
            
  
          
        
        
        
        </main>
    <Footer/>
    </div>
    )
}


  

