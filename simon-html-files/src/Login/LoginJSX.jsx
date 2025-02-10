import React from 'react';
import '../app.css';


export default function doLogin(event){
    
    event.preventDefault();
    console.log('logging in')
    if (username === "validUsername" && password === "validPassword"){
      navigate("/todo");
    } 
    else {
      alert("Invalid password/user")
    }

      
    
  }