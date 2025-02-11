import React, { useState } from 'react';
import Header from '../components/header'
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';
import doLogin from './LoginJSX';
import '../app.css';
export default function Login() {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const navigate = useNavigate();
/* java script  functions */
  



  /* end java script functions */





      return (
      <div className='fullpage'>
      <Header />
      <main className="centered">
      <h1 className="extrabottommargins extratopmargins size-increase" >Welcome to To-Do Facts</h1>
      
      <section>
        <form onSubmit={(e) => doLogin(e, username, password, navigate)}>

          <div>
            <input className = "bottommargins size-increase" type="text" id="username" placeholder = "username" name="username" value = {username} onChange={(e) => setUsername(e.target.value)} /> 
          </div>
          <div>
            <input className ="topmargins size-increase" type="password" placeholder="password (database placeholder)" value = {password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className = "extratopmargins extrabottommargins size-increase coolColoredButtons somePaddingOnTheSides">Login</button>
          <button type="submit" className = "extratopmargins extrabottommargins size-increase coolColoredButtons somePaddingOnTheSides">Create</button>
          </form>
      </section>
      
      
    </main>
    <Footer/>
    </div>
      )
  }