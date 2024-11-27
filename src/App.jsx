import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import Part2Page from './pages/Part2Page';
import Part4Page from './pages/Part4Page';
import ClosestPairPage from './pages/ClosestPairPage';
import IntegerMultiplicationPage from './pages/IntegerMultiplicationPage';
import './assets/styles.css';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/part2" element={<Part2Page />} />
        
        <Route path="/part4" element={<Part4Page />} />
        <Route path="/closest-pair" element={<ClosestPairPage />} />
        <Route path="/integer-multiplication" element={<IntegerMultiplicationPage />} />
      </Routes>
    </Router>
  );
};

export default App;
