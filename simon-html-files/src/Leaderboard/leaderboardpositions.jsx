import React , { useState, useEffect } from 'react';

import '../app.css';





export function LeaderboardPositions() {

  const [leaderboard, setLeaderboard] = useState([
    {username: "First Place User", score: 10 },
    {username: "Second Place User",  score: 8},
    {username: "Third Place User", score: 5}

  ]);
    useEffect(() => {
  
      let intervals = setInterval(() => {
      let theleaderboard = localStorage.getItem('leaderboard');
      if (theleaderboard){
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
        const leadervals = localStorage.getItem('leaderboard')
        (setLeaderboard(JSON.parse(leadervals)))
      }else{
        theleaderboard = localStorage.setItem('leaderboard', JSON.stringify(leaderboard))
      }
  
      
      }, 1000);
  
      return () => clearInterval(intervals);
  
      
  
      }, [])


    return(
        <div>
        <h2 className = "centered">Leaderboard</h2> 
        <section>
          <div className="leaderboard-entry somePaddingOnTheSides" >
            <img width="20px" id="img-id-placeholder" src="goldmedal.png" alt="screenshot of medal"/> 
            <span> 1 (rank)</span>
            <span id="rank-1-name"> {leaderboard[0].username} (placeholder for the first-ranked user's name. updated live via Websocket)</span>
            <span id="rank-1-score"> {leaderboard[0].score} (placeholder for the first-ranked user's tasks completed. updated live via Websocket) </span>
          </div>
          <div className="leaderboard-entry somePaddingOnTheSides">
            <img width="20px" id="img-id-placeholder" src="silvermedal.png" alt="screenshot of medal"/>
            <span> 2 (rank)</span>
            <span id="rank-2-name"> {leaderboard[1].username} (placeholder for the second-ranked user's name. updated live via Websocket) </span>
            <span id="rank-2-score"> {leaderboard[1].score} (placeholder for the second-ranked user's tasks completed. updated live via Websocket) </span>
          </div>
          <div className="leaderboard-entry somePaddingOnTheSides">
            <img width="20px" id="img-id-placeholder" src="bronzemedal.png" alt="screenshot of medal"/>
            <span> 3 (rank)</span> 
            <span id="rank-3-name"> {leaderboard[2].username} (placeholder for the third-ranked user's name. updated live via Websocket)</span>
            <span id="rank-3-score"> {leaderboard[2].score} (placeholder for the third-ranked user's tasks completed. updated live via Websocket) </span> 
        
          </div>
        
      </section>
      </div>
    )

}
