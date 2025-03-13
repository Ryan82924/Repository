import React, { useState, useEffect } from 'react';
import '../app.css';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Header({auth, setAuth}) {
  let navigate = useNavigate()

  

  /*async function authCheck(){
    console.log("frontend console log received")
    const response = await fetch(`/api/auth`, {

    method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
    
      },
      credentials: "include"

    })
     
    if (response?.status === 200){
      setAuth(true)
      return true

    }else{
      setAuth(null)
      return null

    }
  }/*

  /*useEffect(()=>{
    authCheck()
  },[])*/
  useEffect(()=>{
    
    if (auth) {
      navigate('/todo');
}},[auth])
    return( <header className="top-bar">
      
    <h2 className="site-name">To-Facts</h2>
    <nav className= "site-nav">
        <NavLink to= "/" className="right-link"> Login </NavLink>
        {auth ? <><NavLink to="/todo" className="right-link"> To-do </NavLink><NavLink to="/leaderboard" className="right-link"> Leaderboard </NavLink></> : null}
           
    
        
    </nav>
    
  </header>
    )
}