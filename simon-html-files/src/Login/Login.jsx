import React from 'react';
import Header from '../components/header'
import Footer from '../components/footer';
import '../app.css';


export default function Login() {

    return (
    <div className='fullpage'>
    <Header />
    <main className="centered">
    <h1 className="extrabottommargins extratopmargins size-increase" >Welcome to To-Do Facts</h1>
    
    <section>
        <form method="get" action="To-Do.html">
        <div>
          <input className = "bottommargins size-increase" type="text" id="username" name="username" placeholder="Username" /> 
        </div>
        <div>
          <input className ="topmargins size-increase" type="password" placeholder="password (database placeholder)" />
        </div>
        <button type="submit" className = "extratopmargins extrabottommargins size-increase">Login</button>
        <button type="submit" className = "extratopmargins extrabottommargins size-increase">Create</button>
        </form>
    </section>
      
    
    
  </main>
  <Footer/>
  </div>
    )
}