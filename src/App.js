import "./App.css";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from "./Navbar";
import Players from "./Players";
import PlayerComparison from "./PlayerComparison";

function App() {
  return <div className="App">
    <Router>
      <Navbar />
      <Routes>
        <Route path="/Players/" element={<Players />} />
        <Route path="/PlayerComparison/" element={<PlayerComparison />} />
      </Routes>
    </Router>
    </div>;
}

export default App;