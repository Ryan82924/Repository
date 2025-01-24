import React from 'react';
import Header from '../components/header'
import Footer from '../components/footer';
import '../app.css';


export default function About() {

    return (
    <div className='fullpage'>
    <Header />
    <main>
      <p className = "fancy-text">picture of the app while I was making it</p>
      <div id="picture" className="picture-box"><img width="400px" src="applicationss-web260.jpg" alt="random" /></div>

      <p className = "fancy-text">
        To-Facts is an application that gives unique, 
        interesting facts pulled from the internet after the completion of a task. 
        To-Facts helps users to be able to keep track of items on their to-do list while 
        also helping motivate them to complete these items through a reward system that 
        gives an interesting fact upon the completion of a task.
      </p>

      
   
    </main>
  <Footer/>
  </div>
    )
}