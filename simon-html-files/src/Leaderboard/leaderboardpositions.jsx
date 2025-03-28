import React , { useState, useEffect } from 'react';

import '../app.css';
import { LeaderboardNotifier } from './LeaderboardNotifier';

/*const LeaderboardChanger = {
  System: 'System',
  ScoreUpdate: 'ScoreUpdate',
};*/

/*class EventMessage {
  constructor(from, type, value) {
    this.from = from;
    this.type = type;
    this.value = value;
  }
}


class LeaderBoardChangeNotifier {
  broadcastEvent(from, type, value) {
    const event = new EventMessage(from, type, value)
    this.handlers.forEach((handler) => handler(event))
  }
  removeHandler(handler) {
    this.handlers = this.handlers.filter((h) => h !== handler)
  }
  addHandler(handler) {
    if (!this.handlers.includes(handler)) {
      this.handlers.push(handler)
    }
  }

  receiveEvent(event) {
  
    this.events.push(event);
    
    this.handlers.forEach((handler) => {
      
      handler(event);
    });
  }
  handlers = []
  constructor() {
    this.events = [];
    let port = window.location.port;
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
    this.socket.onopen = (event) => {
      this.receiveEvent(new EventMessage('To-do', LeaderboardChanger.System, { msg: 'connected' }));
    };
    this.socket.onclose = (event) => {
      this.receiveEvent(new EventMessage('To-do', LeaderboardChanger.System, { msg: 'disconnected' }));
    };
    this.socket.onmessage = async (msg) => {
      try {
        const event = JSON.parse(await msg.data.text());
        this.receiveEvent(event);
      } catch {}
    };
  /*class LeaderboardChangeNotifier {
    events = [];
    handlers = [];
  // will need to take this constructore and remove 
  // the interval function taking in the event data

    constructor() {
      let port = window.location.port;
      const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
      this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
      this.socket.onopen = (event) => {
        this.receiveEvent(new EventMessage('To-do', GameEvent.System, { msg: 'connected' }));
      };
      this.socket.onclose = (event) => {
        this.receiveEvent(new EventMessage('To-do', GameEvent.System, { msg: 'disconnected' }));
      };
      this.socket.onmessage = async (msg) => {
        try {
          const event = JSON.parse(await msg.data.text());
          this.receiveEvent(event);
        } catch {}
      };
    }*/

  

  /*broadcastEvent(from, type, value) {
    const event = new EventMessage(from, type, value);
    this.socket.send(JSON.stringify(event));
  } 

  

  
}


} 

const LeaderboardNotifier = new LeaderBoardChangeNotifier()
window.LeaderboardNotifier = LeaderboardNotifier;
*/

const LeaderBoardChange = {
  End: 'LeaderboardEnd', 
}
export function LeaderboardPositions(){
  const [leaderboard, setLeaderboard] = useState([])
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
      localStorage.setItem('leaderboard', JSON.stringify(newLeaderboard))
      
      return newLeaderboard
    })

  }

  /*function handleLeaderboard(event){
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

  } */

  /* function handleGameEvent(event) {
    setEvent([...events, event]);
  } */

  useEffect(() => {
    async function getTopScores(){
      let response = await fetch('/api/highscores')
      const data = await response.json();
      console.log("top scores", data)
      setLeaderboard(data);
    }
    getTopScores()
    
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
      <span> {index+1} (rank)</span> &nbsp;
      <span> {"Username: " +entries.username} </span> &nbsp;
      <span> {"Score: " +entries.score} </span> &nbsp;
      </div>
      
      ) 
    
    }
    )
    }
    </section>
    </div>)


  }