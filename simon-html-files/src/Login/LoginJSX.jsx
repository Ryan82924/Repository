import React from 'react';
import '../app.css';


export default function doLogin(event, username, password, navigate){
    
    event.preventDefault();
    console.log('logging in')
    if (username === "a" && password === "b"){ /*will 
      replaces with fetches from db */
      navigate("/todo");
    } 
    else {
      alert("Invalid password/user")
    }

      
    
  }