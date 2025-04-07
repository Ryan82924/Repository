import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import {CurrentUser} from './currentleaderboarduser';
import {LeaderboardPositions} from './leaderboardpositions';
import '../app.css';


export default function Leaderboard() {

    return (
    <div className='fullpage'>
    <main>
      
        
      <LeaderboardPositions/>

      
      <CurrentUser />

      
    </main>
  <Footer/>
  </div>
    )
}