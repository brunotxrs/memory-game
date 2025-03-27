import React from 'react';
import HomeScreen from './components/homescreen/HomeScreen';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomeScreen />} />
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;