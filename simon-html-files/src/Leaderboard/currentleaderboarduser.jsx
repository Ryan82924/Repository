import React from 'react';
import '../app.css';



export function CurrentUser() {
  let scores = -1
  const scoresText = localStorage.getItem('score')
  if (scoresText){
    scores = JSON.parse(scoresText)
  }


  

    return(
        <div className="leaderboard-entry-current-user">
        <span> Unranked </span> 
        <span id="rank-3-name"> Current User (placeholder for the Current user's name. updated live via Websocket)</span>
        <span id="rank-3-score"> {scores} (placeholder for the Current user's tasks completed. updated live via Websocket) </span> 
    
      </div>
    );
}