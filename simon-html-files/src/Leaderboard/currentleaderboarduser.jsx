import React, { useState, useEffect } from 'react';
import '../app.css';





export function CurrentUser() {

  const [score, setScore] = useState(0);
  const [username, setUsername] = useState('Test Username Placeholder');
  /*useEffect(() => {

    let intervals = setInterval(() => {
    let itemscore = localStorage.getItem('score');
    
    if (itemscore){
      let scores = JSON.parse(itemscore);
      (setScore(score => scores ))
    }

    
    (setUsername(username))}, 1000);

    return () => clearInterval(intervals);

    

    }, [score, username])*/
    

  useEffect(()=>{
    async function getCurrentScore(){
    let response = await fetch('/api/score', {method: 'GET'})
    
    const data = await response.json(); 
  if (response?.status === 200){
    setScore(data.score);
    console.log(data.score)
  }else{
    console.log(data)
  }
  }
  
  getCurrentScore()},[score])
    
    
    return(
      <div className="leaderboard-entry-current-user">
      <span> Unranked </span> 
      <span id="current-name "> {username} ( placeholder for the Current user's name. updated live via Websocket)</span>
      <span id="current-score "> {score} ( placeholder for the Current user's tasks completed. updated live via Websocket) </span> 
    
    </div>
  );
    
  }
  
  
  


  

  
