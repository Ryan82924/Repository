import React, { useState, useEffect } from 'react';
import { LeaderboardNotifier } from './LeaderboardNotifier';
import '../app.css';





export function CurrentUser() {

  const [score, setScore] = useState(0);
  const [username, setUsername] = useState('Test Username Placeholder');

async function getUsername(){
    console.log("frontend console")
    const response = await fetch(`/api/usernameis`, {

    method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      credentials: "include"
    })
    const data = await response.json(); 
    if (response?.status === 200){
      setUsername(data.username)
      console.log("ahhhhhh")
    }else{
      console.log(data)
      alert(data)
    }
  }

useEffect(()=>{
getUsername()
},[])





  /*useEffect(() => {

    let intervals = setInterval(() => {
    let itemscore = localStorage.getItem('score');
    
    if (itemscore){
      let scores = JSON.parse(itemscore);
      (setScore(score => scores ))
    }

    
    (setUsername(username))}, 1000);

    return () => clearInterval(intervals);

    

    }, [score, username])*/
    

  useEffect(()=>{
    async function getCurrentScore(){
    let response = await fetch('/api/score', {method: 'GET'})
    
    const data = await response.json(); 
  if (response?.status === 200){
    console.log("score before", score)
    setScore(data.score);
    console.log("fetched", data.score)
  }else{
    console.log("failed to fetch",data)
  }
  }
  
  getCurrentScore()},[score])

  function handleLeaderboard(event){
    if (username === event.value.name){
      setScore(event.value.score)
    }
  }

useEffect(() => {
  async function getCurrentScore(){
    let response = await fetch('/api/score', {method: 'GET'})
    
    const data = await response.json(); 
  if (response?.status === 200){
    console.log("score before", score)
    setScore(data.score);
    console.log("fetched", data.score)
  }else{
    console.log("failed to fetch", data)
  }
  }
  getCurrentScore()

    LeaderboardNotifier.addHandler(handleLeaderboard)
    return () => {
        LeaderboardNotifier.removeHandler(handleLeaderboard)
    }
  }, [username])

    
    
    return(
      <div className="leaderboard-entry-current-user">
      <span> Current User:  </span> &nbsp;
      <span id="current-name "> {username}</span>&nbsp;
      <span id="current-score "> Score:  {score} </span> 
    
    </div>
  );
    
  }
  
  
  


  

  
