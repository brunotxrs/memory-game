import React from 'react';
import HomeScreen from './components/homescreen/HomeScreen';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GameScreen from './components/gamescreen/GameScreen';
import ScoreDashboard from './components/scoredashboard/ScoreDashboard';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomeScreen />} />
      <Route path='/gamescreen' element={<GameScreen />} />
      <Route path='/scoredashboard' element={<ScoreDashboard />} />
      <Route path='/homescreen' element={<HomeScreen />} />
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;