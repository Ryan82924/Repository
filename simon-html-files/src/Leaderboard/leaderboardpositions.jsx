import React , { useState, useEffect } from 'react';

import '../app.css';


const GameEvent = {
  End: 'gameEnd', 
};
class EventMessage {
  constructor(from, type, value) {
    this.from = from;
    this.type = type;
    this.value = value;
  }
}

class GameEventNotifier {
  handlers = []
  usernames = ["Doughnutdog ", "Doughnutcat ", "Doughnut "]
  getRandomUser(){
    return this.usernames[Math.floor(Math.random() * this.usernames.length)]
  }
  constructor() {
    setInterval(() => {
      const score = Math.floor(Math.random() * 3000)
      const userName = this.getRandomUser()
      this.broadcastEvent(userName, GameEvent.End, { name: userName, score });
    }, 1000)
  }

  broadcastEvent(from, type, value) {
    const event = new EventMessage(from, type, value)
    this.handlers.forEach((handler) => handler(event))
  }

  addHandler(handler) {
    if (!this.handlers.includes(handler)) {
      this.handlers.push(handler)
    }
  }

  removeHandler(handler) {
    this.handlers = this.handlers.filter((h) => h !== handler)
  }
}

const GameNotifier = new GameEventNotifier()

export function LeaderboardPositions() {
    const [leaderboard, setLeaderboard] = useState([
      {username: "first", score: 10},
      {username: "second", score: 8},
      {username: "third", score: 5}

  ]);
  
  








    



      
      
      
      
        
      
      


      


    
          <div>
            <div className="leaderboard-entry somePaddingOnTheSides">
    <img width="20px" id="img-id-placeholder" src="goldmedal.png" alt="screenshot of medal" />
    <span> 1 (rank)</span>
    <span id="rank-1-name"> {leaderboard[0].username} (placeholder for the first-ranked user's name. updated live via Websocket)</span>
    <span id="rank-1-score"> {leaderboard[0].score} (placeholder for the first-ranked user's tasks completed. updated live via Websocket) </span>
  </div><div className="leaderboard-entry somePaddingOnTheSides">
      <img width="20px" id="img-id-placeholder" src="silvermedal.png" alt="screenshot of medal" />
      <span> 2 (rank)</span>
      <span id="rank-2-name"> {leaderboard[1].username} (placeholder for the second-ranked user's name. updated live via Websocket) </span>
      <span id="rank-2-score"> {leaderboard[1].score} (placeholder for the second-ranked user's tasks completed. updated live via Websocket) </span>
    </div><div className="leaderboard-entry somePaddingOnTheSides">
      <img width="20px" id="img-id-placeholder" src="bronzemedal.png" alt="screenshot of medal" />
      <span> 3 (rank)</span>
      <span id="rank-3-name"> {leaderboard[2].username} (placeholder for the third-ranked user's name. updated live via Websocket)</span>
      <span id="rank-3-score"> {leaderboard[2].score} (placeholder for the third-ranked user's tasks completed. updated live via Websocket) </span>
  </div>
  </div>
}
