import React , { useState, useEffect } from 'react';

import '../app.css';


const LeaderBoardChange = {
  End: 'LeaderboardEnd', 
}
class EventMessage {
  constructor(from, type, value) {
    this.from = from;
    this.type = type;
    this.value = value;
  }
}

class LeaderBoardChangeNotifier {
  handlers = []
  usernames = ["Doughnutdog ", "Doughnutcat ", "Doughnut "]
  getRandomUser(){
    return this.usernames[Math.floor(Math.random() * this.usernames.length)]
  }
  constructor() {
    setInterval(() => {
      const score = Math.floor(Math.random() * 3000)
      const userName = this.getRandomUser()
      this.broadcastEvent(userName, LeaderBoardChange.End, { name: userName, score });
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

const LeaderboardNotifier = new LeaderBoardChangeNotifier()



export function LeaderboardPositions(){
  const [leaderboard, setLeaderboard] = useState(() => {
    /*localStorage.setItem('leaderboard', leaderboard)*/
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
  /* function handleGameChange(event) {
  setEvent((prevEvents) => {
    let newEvents = [event, ...prevEvents]; // Adds new event to the front
    if (newEvents.length > 10) {
      newEvents = newEvents.slice(1, 10); // Keeps last 10 events
    }
    return newEvents;
  });
}*/
  function handleLeaderboard(event){
    setLeaderboard((prevLeaderboard) => {
      
      let newLeaderboard = prevLeaderboard.slice(); 
    
     newLeaderboard = newLeaderboard.filter(user => user.username)
     
    let user = newLeaderboard.find((user)=>user.username === event.value.name)
    if (user){
      user.score = event.value.score}
    else 
    {newLeaderboard.push({username: event.value.name, score: event.value.score})}
        
     
      newLeaderboard = newLeaderboard.sort((a,b) => b.score-a.score)
      newLeaderboard = newLeaderboard.slice(0, 3);
      console.log(newLeaderboard, "lb after slicing")
      localStorage.setItem('leaderboard', JSON.stringify(newLeaderboard))
      return newLeaderboard
    })

  }

  useEffect(() => {
    LeaderboardNotifier.addHandler(handleLeaderboard)
    return () => {
        LeaderboardNotifier.removeHandler(handleLeaderboard)
    }
  }, [])
  
  return(
    <div>
        <h2 className = "centered">Leaderboard</h2> 
        <section>
    {leaderboard.map((entries,index)=>{
      let images = [
        "goldmedal.png",
        "silvermedal.png",
        "bronzemedal.png"
      ][index]
    return (<div key = {index} className="leaderboard-entry somePaddingOnTheSides" >
      <img width="20px" src={images} alt="screenshot of medal"/>   
      <span> {index+1} (rank)</span>
      <span> {"Username :" +entries.username} </span>
      <span> {"Score :" +entries.score} </span>
      </div>
      
      ) 
    
    }
    )
    }
    </section>
    </div>)


}
