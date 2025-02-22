import React, { useState, useEffect } from 'react';
import '../app.css';





export function CurrentUser() {

  const [score, setScore] = useState(0);
  const [username, setUsername] = useState('Test Username Placeholder');
  useEffect(() => {

    let intervals = setInterval(() => {
    let itemscore = localStorage.getItem('score');
    if (itemscore){
      let scores = JSON.parse(itemscore);
      (setScore(score => scores ))
    }

    
    (setUsername(username))}, 1000);

    return () => clearInterval(intervals);

    

    }, [score, username])

  
    
    
    
    return(
      <div className="leaderboard-entry-current-user">
      <span> Unranked </span> 
      <span id="rank-3-name "> {username} ( placeholder for the Current user's name. updated live via Websocket)</span>
      <span id="rank-3-score "> {score} ( placeholder for the Current user's tasks completed. updated live via Websocket) </span> 
    
    </div>
  );
    
  }
  
  
  


  

  
