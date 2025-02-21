import React, { useState } from 'react';
import '../app.css';





export function CurrentUser() {

  const [score, setScore] = useState(0);
  const [username, setUsername] = useState('');
  useEffect(() => {
    let intervals = setInterval(() => {
      (setScore(score))
      (setUsername(username))}, 1000);

      return () => clearInterval(intervals);

    

    }, [])

  

  
  function websocketPlaceholder(score, username){
    
      
      
    }
    
    
    
  
    
  }
  
  
  


  

    return(
        <div className="leaderboard-entry-current-user">
        <span> Unranked </span> 
        <span id="rank-3-name"> {username} (placeholder for the Current user's name. updated live via Websocket)</span>
        <span id="rank-3-score"> {score} (placeholder for the Current user's tasks completed. updated live via Websocket) </span> 
    
      </div>
    );
