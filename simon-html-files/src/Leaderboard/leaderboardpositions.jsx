import React , { useState, useEffect } from 'react';

import '../app.css';


const GameEvent = {
  End: 'gameEnd', 
}
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

/*---*/

export function LeaderboardPositions(){
  const [leaderboard, setLeaderboard] = useState(() => {
    localStorage.setItem('leaderboard', leaderboard)
    let lb = JSON.parse(localStorage.getItem('leaderboard'))
    if (lb){
      return lb
    }else{
      return [
        {username: "first", score: 10},
        {username: "second", score: 8},
        {username: "third", score: 5}
      ]
    }

  })
  /* function handleGameEvent(event) {
  setEvent((prevEvents) => {
    let newEvents = [event, ...prevEvents]; // Adds new event to the front
    if (newEvents.length > 10) {
      newEvents = newEvents.slice(1, 10); // Keeps last 10 events
    }
    return newEvents;
  });
}*/
  function handleGame(event){
    setLeaderboard((prevLeaderboard) => {
      
      let newLeaderboard = prevLeaderboard.slice(); 
     let username = (user=>{user= event.value.name})
     let score = (score=>{score= event.value.score})
     newLeaderboard(username:username,score:score)
     
      newLeaderboard = newLeaderboard.sort((a,b) => b-a)
      newLeaderboard = newLeaderboard.slice(0, 3);
      
      return newLeaderboard;
    });

  }

  useEffect(() => {
    GameNotifier.addHandler(handleGameEvent)
    return () => {
        GameNotifier.removeHandler(handleGameEvent)
    }
  }, [])
  const bouton = document.getElementById('myButton');
  const image = document.getElementById('myImg');
  let index = 0; 
  // Instead of using a called function 
  // I used the new Javascript syntax
  bouton.addEventListener('click', () => {
      // you probably will have to adapt the image path 
      // I used the one that you use on the video
      image.src='img/' + images[index];
      index++;
      // If you want to restart, set the index to 0
      // once the array will be passed
      if (index >= images.length) {
          index = 0;}})
  return(
    
  <div>
  <div>
    leaderboard.map()
  <div className="leaderboard-entry somePaddingOnTheSides" >
  <img width="20px" id="img-id-placeholder" src={images} alt="screenshot of medal"/> 
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
</div>
</div>
)




}
          
          
              
