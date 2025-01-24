import React from 'react';
import Header from '../components/header'
import Footer from '../components/footer';
import '../app.css';


export default function Todo(){ 

    return (
    <div className='fullpage'>
    <Header />
    <main>
      <section>
        <h2 className = "task-create"> Create a new task </h2>
        <form className = "task-create" method = "post" action="/add-task">
          <label htmlFor ="task-input">Task:</label>
          <input type="text" id="task-input" name="task" required/>
          <button type="submit"> Add Task</button>
        </form>
      </section>
      <section>
        <h2 className = "task-create"> Your Tasks </h2>
        <section className ="task-create">
          <div className = "task-item"> 
            <span> Task 1 (placeholder for tasks pulled from database)</span>
            <input type="checkbox" id="task1"/>
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
       </section>

        
          

        
      
      
      
      </main>
  <Footer/>
  </div>
  )
}
    
