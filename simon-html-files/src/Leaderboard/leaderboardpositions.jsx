import React from 'react';
import '../app.css';





export function LeaderboardPositions() {
    return(
        <div>
        <h2 className = "centered">Leaderboard</h2> 
        <section>
          <div className="leaderboard-entry somePaddingOnTheSides" >
            <img width="20px" id="img-id-placeholder" src="goldmedal.png" alt="screenshot of medal"/> 
            <span> 1 (rank)</span>
            <span id="rank-1-name"> DoughnutLover222 (placeholder for the first-ranked user's name. updated live via Websocket)</span>
            <span id="rank-1-score"> 20 (placeholder for the first-ranked user's tasks completed. updated live via Websocket) </span>
          </div>
          <div className="leaderboard-entry somePaddingOnTheSides">
            <img width="20px" id="img-id-placeholder" src="silvermedal.png" alt="screenshot of medal"/>
            <span> 2 (rank)</span>
            <span id="rank-2-name"> DoughnutHater111 (placeholder for the second-ranked user's name. updated live via Websocket) </span>
            <span id="rank-2-score"> 19 (placeholder for the second-ranked user's tasks completed. updated live via Websocket) </span>
          </div>
          <div className="leaderboard-entry somePaddingOnTheSides">
            <img width="20px" id="img-id-placeholder" src="bronzemedal.png" alt="screenshot of medal"/>
            <span> 3 (rank)</span> 
            <span id="rank-3-name"> DoughnutIndifferent333 (placeholder for the third-ranked user's name. updated live via Websocket)</span>
            <span id="rank-3-score"> 18 (placeholder for the third-ranked user's tasks completed. updated live via Websocket) </span> 
        
          </div>
        
      </section>
      </div>
    )

}
