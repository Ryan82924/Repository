import React from 'react';
import '../app.css';
import {NavLink} from 'react-router-dom';
export default function Footer() {

    return ( <footer>
      <nav className= "footer-bar">
        <NavLink to= "/about" className="right-link"> About </NavLink>
        <a href="https://github.com/Ryan82924/Repository" className ="footer-link">Source</a>

      </nav>
    </footer>
    )
}