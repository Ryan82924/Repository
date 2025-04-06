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

  
    

    


 
  
  

  




    return (
      <div className='fullpage'>
      
      <main>

      
        
        
        <TaskSubmission setTasks = {setTasks} taskText = {taskText} setTaskText = {setTaskText}/>



        
         <TaskItem setTasks={setTasks} tasks= {tasks} setScore={setScore} score={score} funFact={funFact} setFunFact={setFunFact}/>
  
          
            
  
          
        
        
        
        </main>
    <Footer/>
    </div>
    )
}


  

