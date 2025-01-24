import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from '../Login/Login';
import { Todo } from '../To-Do/To-do';
import { Leaderboard } from '../Leaderboard/leaderboard';
import { About } from '../About/about';
import {Header} from '../components/header'
import {Footer} from '../components/footer'


export default function App() {
  return (
    <BrowserRouter>
      <Header/>

        <Routes>
          <Route path='/' element={<Login />} exact />
          <Route path='/todo' element={<Todo />} />
          <Route path='/leaderboard' element={<Leaderboard />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      <Footer/>
    </BrowserRouter>
  );
}
