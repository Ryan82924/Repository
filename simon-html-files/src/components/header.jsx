import React from 'react';
import '../app.css';
import { NavLink } from 'react-router-dom';
export default function Header() {
  const [auth, setAuth] = setAuth([])

  async function authCheck(){
    console.log("frontend console log received")
    const response = await fetch(`http://localhost:3000/auth`, {

    method: 'GET',
      body: JSON.stringify({}),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
    
      },
      credentials: "include"

    })
    const data = await response.json(); 
    if (response?.status === 200){
      
        

    }else{
      console.log(data)
      alert(data)

    }
  }

  useEffect(()=>{
    authCheck()
  },[])
    return( <header className="top-bar">
      
    <h2 className="site-name">To-Facts</h2>
    <nav className= "site-nav">
        <NavLink to= "/" className="right-link"> Login </NavLink>
        <NavLink to= "/todo" className="right-link"> To-do </NavLink>
        <NavLink to ="/leaderboard" className="right-link"> Leaderboard </NavLink>

    </nav>
    
  </header>
    )
}