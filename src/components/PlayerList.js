import React, { useState, useEffect } from 'react';
import './PlayerList.css';

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/players');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setPlayers(data.players || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching players:', err);
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  if (loading) {
    return <div className="loading">Loading tables...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="player-list-container">
      <div className="player-list-header">
        <h2>Players (bot or human)</h2>
      </div>
      
      {players.length === 0 ? (
        <p className="no-players">No players registered</p>
      ) : (
        <div className="player-grid">
          {players.map((player) => (
            <div key={player.pseudo} className="table-card">
              <h3>{player.pseudo}</h3>
              <div className="table-details">
                <p>Bankroll: {player.bankroll}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayerList;
