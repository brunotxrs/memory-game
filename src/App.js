import React from 'react';
import HomeScreen from './components/homescreen/HomeScreen';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GameScreen from './components/gamescreen/GameScreen';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomeScreen />} />
      <Route path='/gamescreen' element={<GameScreen />} />
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;