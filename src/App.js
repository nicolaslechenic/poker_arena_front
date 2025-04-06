import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import TablesPage from './pages/TablesPage';
import PlayersPage from './pages/PlayersPage';
import SpectatorPage from './pages/SpectatorPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="App-main">
          <Routes>
            <Route path="/" element={<TablesPage />} />
            <Route path="/players" element={<PlayersPage />} />
            <Route path="/spectate" element={<SpectatorPage />} />
            <Route path="/spectate/:tableId" element={<SpectatorPage />} />
          </Routes>
        </main>
        <footer className="App-footer">
          <p>&copy; {new Date().getFullYear()} Poker Arena</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
