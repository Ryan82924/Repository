import React, { useEffect, useState } from 'react';
import Header from '../components/header'
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';
import {doLogin, createUser, databasePlaceholder} from './LoginJSX';

import '../app.css';
export default function Login(props) {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const navigate = useNavigate();
  const {databaseplaceholder, setDatabaseplaceholder} = databasePlaceholder();
  

  
  async function createUserFrontBack(event, endpoint){
    event.preventDefault();
    const response = await fetch(`${endpoint}`, {

    method: 'POST',
      body: JSON.stringify({ username: username, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
    
      },
      credentials: "include"
      


      

    })
    const data = await response.json(); 
    if (response?.status === 200){
      console.log("testing")
      createUser(event, username, password, navigate, setDatabaseplaceholder)
      localStorage.setItem('username',username)
        

    }else{
      console.log(data)

    }
  }
  async function authCheck(){
    console.log("frontend console log received")
    const response = await fetch(`/api/auth`, {

    method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
    
      },
      credentials: "include"

    })
    console.log("request recieved")
    if (response.status === 200){
      props.setAuth(true)
      return true
      
      
        

    }else{
      props.setAuth(null)
      return null

    }
  }

  useEffect(()=>{
      authCheck()
    },[])
    /*useEffect(()=>{
      
      if (props.auth) {
        navigate('/todo');
  }},[props.auth])*/


  async function loginUserFrontBack(event, endpoint){
    console.log("frontend console")
    console.log({endpoint})
    event.preventDefault();
    const response = await fetch(`${endpoint}`, {

    method: 'POST',
      body: JSON.stringify({ username: username, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
    
      },
      credentials: "include"

      
    })
    const data = await response.json(); 
    console.log("authorization info:", data);
    if (response?.status === 200){
      doLogin(event, username, password, navigate, setDatabaseplaceholder)
      await authCheck()
        //if (newAuth){
          //navigate('/todo')
        //}
        //navigate('/todo')
      
      
      console.log("ahhhhhh")
      
        

    }else{
      console.log(data)
      alert(data)

    }
  }

  

  


  
/*if (response?.status === 200) {
        localStorage.setItem('userName', userName);
        props.onLogin(userName);
      } else {
        const body = await response.json();
        setDisplayError(`⚠ Error: ${body.msg}`);
      }*/
  function handleSubmit(event){
    
      let action = event.nativeEvent.submitter.value
      /*event.submitter.name*/
      event.preventDefault();
    if (action === "login") {
      loginUserFrontBack(event, '/api/login')}
      
    else if (action==="create"){
      createUserFrontBack(event, '/api/create')
    }

  }
/* java script  functions */


  
/*async function doLogin() {
  doLoginOrCreate(`/api/auth/login`);
}

async function createUser() {
  doLoginOrCreate(`/api/auth/create`);
}


async doLoginOrCreate(endpoint, username, password){
  const response = await fetch(endpoint, {
  method: 'post',
      body: JSON.stringify({ username: username, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
  }})
  if (response?.status === 200) {
    localStorage.setItem('username', username);
    doLogin(username); 
  } else {
    const body = await response.json();
    setDisplayError(`⚠ Error: ${body.msg}`);
  }
} */


  /* end java script functions */





      return (
      <div className='fullpage'>
      
      <main className="centered">
      <h1 className="extrabottommargins extratopmargins size-increase" >Welcome to To-Do Facts</h1>
      
      <section>
        <form onSubmit = {handleSubmit}>

          <div>
            <input className = "bottommargins size-increase" type="text" id="username" placeholder = "username" name="username" value = {username} onChange={(e) => setUsername(e.target.value)} /> 
          </div>
          <div>
            <input className ="topmargins size-increase" type="password" placeholder="password (database placeholder)" value = {password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className = "extratopmargins extrabottommargins size-increase coolColoredButtons somePaddingOnTheSides" value = "login" >Login</button>
          <button type="submit" className = "extratopmargins extrabottommargins size-increase coolColoredButtons somePaddingOnTheSides" value = "create">Create</button>
          </form>
      </section>
      
      
    </main>
    <Footer/>
    </div>
      )
  
}