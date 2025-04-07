import React , { useState, useEffect } from 'react';

import '../app.css';
import { LeaderboardNotifier } from './LeaderboardNotifier';



const LeaderBoardChange = {
  End: 'LeaderboardEnd', 
}
export function LeaderboardPositions(){
  const [leaderboard, setLeaderboard] = useState([])
 




  function handleLeaderboard(event){
    setLeaderboard((prevLeaderboard) => {
      
      let newLeaderboard = prevLeaderboard.slice(); 
    
     newLeaderboard = newLeaderboard.filter(user => user.username)
     
    let user = newLeaderboard.find((user)=>user.username === event.value.name)
    if (user){
      user.score = event.value.score}
    else 
    {newLeaderboard.push({username: event.value.name, score: event.value.score})}

    async function getTopScores(){
      let response = await fetch('/api/highscores')
      const data = await response.json();
      console.log("top scores", data)
      setLeaderboard(data);
      console.log("leaderboard after getTop", leaderboard)
    }
    getTopScores()

    
        
     
      newLeaderboard = newLeaderboard.sort((a,b) => b.score-a.score)
      newLeaderboard = newLeaderboard.slice(0, 3);
      console.log("sliced lb", newLeaderboard)
      localStorage.setItem('leaderboard', JSON.stringify(newLeaderboard))
      
      return newLeaderboard
    })

  }

  

  useEffect(() => {
    async function getTopScores(){
      let response = await fetch('/api/highscores')
      const data = await response.json();
      console.log("top scores", data)
      setLeaderboard(data);
    }
    getTopScores()
    console.log("calling add on mount")
    LeaderboardNotifier.addHandler(handleLeaderboard)
    return () => {
      console.log("calling remove on mount")
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