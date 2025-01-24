import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import  Login  from './Login/Login';
import Todo from './To-Do/To-Do';
import  Leaderboard  from './Leaderboard/leaderboard';
import  About  from './About/about';


function NotFound() {
  return <main className= "size-increase"> 404: Return to sender. Address unknown.</main>;
}
export default function App() {
  return (
    <BrowserRouter>
       

        
          <Routes>
            <Route path='/' element={<Login />} exact />
            <Route path='/todo' element={<Todo />} />
            <Route path='/leaderboard' element={<Leaderboard />} />
            <Route path='/about' element={<About />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
      

        
    
    </BrowserRouter>
  );
}
