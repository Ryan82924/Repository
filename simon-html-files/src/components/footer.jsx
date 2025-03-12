import React from 'react';
import '../app.css';
import {NavLink} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function Footer() {
  const navigate = useNavigate();

  async function logoutUserFrontBack(endpoint){
      
      const response = await fetch(`${endpoint}`, {
  
      method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
      
        },
        credentials: "include"
      })
      const data = await response.json(); 
      if (response?.status === 200){
        navigate('/')
        console.log("i like pumpkin pie")
      }else{
        console.log(data)
        alert(data)
  
      }
    }

    return ( <footer>
      <nav className= "footer-bar">
        <NavLink to= "/about" className="right-link"> About </NavLink>
        <a href = "/" className="right-link" onClick = {(e)=> {logoutUserFrontBack("/api/logout"); e.preventDefault()}}> Log out </a>
        <a href="https://github.com/Ryan82924/Repository" className ="footer-link">Source</a>

      </nav>
    </footer>
    )
}