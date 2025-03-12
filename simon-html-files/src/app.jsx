import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import  Login  from './Login/Login';
import Todo from './To-Do/To-Do';
import  Leaderboard  from './Leaderboard/leaderboard';
import  About  from './About/about';
import { useNavigate, Navigate } from 'react-router-dom';
import Header from './components/header';



function NotFound() {
  return <main className= "size-increase"> 404: Return to sender. Address unknown.</main>;
}
export default function App() {



  const [auth, setAuth] = useState(null)
  let navigate = useNavigate()
  
  
  async function authCheck() {
    console.log("running authCheck...");
    
    const response = await fetch(`/api/auth`, {
      method: 'GET',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      credentials: "include"
    });
    console.log("setting auth")

    if (response.ok) {

      console.log("authenticated user.");
      setAuth(true);
    } else {
      console.log("authentication failed.");
      setAuth(null);
    }
  }
      
      /*if (auth !== data.token){ // auth === null && auth !== data.token 
        setAuth(data.token);
        navigate('/todo')
        console.log("cookie:", data.token);
        return data.token;
      }
      else if(auth === null) {
        setAuth(null);
        console.log("authorization failed");
        return null;
      }
      else if(auth === data.token){
        console.log("logged in")
      }*/
      
    
    useEffect(() => {
      authCheck();
    }, []);
  
  
  /*useEffect(() => {
    let interval = setInterval(authCheck, 1000)

    return () => clearInterval(interval)

    
  }, []);*/
  return (
    
    <><Header auth = {auth} setAuth = {setAuth} /><Routes>


      <Route path='/' element={<Login auth = {auth} setAuth = {setAuth} />} exact />
      <Route path='/about' element={<About />} />





      <Route path='/todo' element={auth ? <Todo /> : <Login />} />
      <Route path='/leaderboard' element={auth ? <Leaderboard /> : <Login />} />
      <Route path='*' element={auth ? <NotFound /> : <Login />} />


      :


    </Routes></>
        
          
      

        
    
    
  );
}
