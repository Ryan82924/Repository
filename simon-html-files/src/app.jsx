import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import  Login  from './Login/Login';
import Todo from './To-Do/To-Do';
import  Leaderboard  from './Leaderboard/leaderboard';
import  About  from './About/about';
import Header from './components/header';



function NotFound() {
  return <main className= "size-increase"> 404: Return to sender. Address unknown.</main>;
}
export default function App() {



  const [auth, setAuth] = useState(null)
  
  
  
 
      
      
      
  
  return (
    
    <><Header auth = {auth} setAuth = {setAuth} /><Routes>


      <Route path='/' element={<Login auth = {auth} setAuth = {setAuth} />} exact />
      <Route path='/about' element={<About />} />





      <Route path='/todo' element={auth ? <Todo /> : <Login auth = {auth} setAuth = {setAuth} />} />
      <Route path='/leaderboard' element={auth ? <Leaderboard /> : <Login auth = {auth} setAuth = {setAuth} />} />
      <Route path='*' element={auth ? <NotFound /> : <Login auth = {auth} setAuth = {setAuth} />} />


      :


    </Routes></>
        
          
      

        
    
    
  );
}
