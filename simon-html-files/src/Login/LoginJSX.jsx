import React, { useState } from 'react';
import '../app.css';
import { AuthState } from './authState';






export function databasePlaceholder(){
  const [databaseplaceholder, setDatabaseplaceholder] = useState({})
  return {
    databaseplaceholder,
    setDatabaseplaceholder
  };
}

  export function doLogin(event, username, password, navigate, databaseplaceholder){

    event.preventDefault();
    console.log('logging in')
    if (databaseplaceholder[username] === password){ /*will 
      replaces with fetches from db */
      navigate("/todo");
      localStorage.setItem('currentUsername', username)
    } 
    

      
    
  }

  export function createUser(event,username,password,navigate, setDatabaseplaceholder){






  event.preventDefault();
    
    console.log('creating account')
  
    const updateDatabase = (username, password) => {
      setDatabaseplaceholder(prevdatabaseplaceholder => ({ ...prevdatabaseplaceholder, [username]: password }));
    };
    updateDatabase(username, password)
    alert('Account created! Press login to login')


    console.log('logging in')
    if (setDatabaseplaceholder[username] === password){ /*will 
      replaces with fetches from db */
      navigate("/todo");

    } 



    
    fetch('http://localhost:3000/api/test')
    .then(res => res.text())
    .then(text => console.log(text))

}



