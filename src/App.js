import "./App.css";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from "./Navbar";
import Players from "./Players";
import PlayerComparison from "./PlayerComparison";
import React, { useState, useEffect } from 'react';
import './DarkMode.css';
function App() {

  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return <div className={`App ${theme}`}>
    <Router>
      <Navbar />
      <button onClick={toggleTheme}>Toggle Theme</button>
      <Routes>
        <Route path="/Players/" element={<Players />} />
        <Route path="/PlayerComparison/" element={<PlayerComparison />} />
      </Routes>
    </Router>
    
    </div>;
}

export default App;