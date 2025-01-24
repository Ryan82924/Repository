import React from 'react';
import '../app.css';
import { NavLink } from 'react-router-dom';
export default function Header() {
    return( <header className="top-bar">
    <h2 className="site-name">To-Facts</h2>
    <nav className= "site-nav">
        <NavLink to= "/" className="right-link"> Login </NavLink>
        <NavLink to= "Todo" className="right-link"> To-do </NavLink>
        <NavLink to ="/leaderboard" className="right-link"> Leaderboard </NavLink>

    </nav>
    
  </header>
    )
}