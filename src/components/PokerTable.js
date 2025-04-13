import React, { useState, useEffect } from 'react';
import './PokerTable.css';

const PokerTable = ({ tableId }) => {
  const [gameState, setGameState] = useState({
    players: [
      { position: 1, name: 'Waiting...', stack: 0, bet: 0, cards: [], isActive: true },
      { position: 2, name: 'Waiting...', stack: 0, bet: 0, cards: [], isActive: true },
    ],
    communityCards: [],
    pot: 0,
    currentAction: '',
    round: 'waiting'
  });

  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        setLoading(false);
      } catch (err) {
        console.error('Error fetching game data:', err);
        setLoading(false);
      }
    };

    fetchGameData();
  }, [tableId]);

  const simulateGameProgress = (gameSet) => {
    if (!gameSet || !gameSet.games || gameSet.games.length === 0) return;
    
    let currentIndex = 0;
    const positions = gameSet.positions;
    
    const interval = setInterval(() => {
      if (currentIndex < gameSet.games.length) {
        const game = gameSet.games[currentIndex];
        const lastAction = game.actions[game.actions.length - 1];
        
        setGameState({
          players: Object.keys(positions).map(pos => {
            const playerAction = game.actions.find(a => a.pseudo === positions[pos]);
            return {
              position: parseInt(pos),
              name: positions[pos],
              stack: playerAction ? playerAction.stack : 0,
              bet: playerAction ? playerAction.value : 0,
              cards: playerAction ? playerAction.cards : [],
              isActive: true
            };
          }),
          communityCards: game.board || [],
          pot: lastAction ? lastAction.pot : 0,
          currentAction: lastAction ? `${lastAction.pseudo} ${lastAction.action} ${lastAction.value > 0 ? lastAction.value : ''}`.trim() : '',
          round: game.round
        });
        
        setCurrentGameIndex(currentIndex);
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentGameIndex(0);
          simulateGameProgress(gameSet);
        }, 5000);
      }
    }, 3000);

    return () => clearInterval(interval);
  };

  const renderCard = (card) => {
    if (!card) return null;
    if (card === 'xX' || card === 'hidden') {
      return <div className="card card-back"></div>;
    }
    return <div className="card">{card}</div>;
  };

  if (loading) {
    return <div className="loading">Loading game data...</div>;
  }

  return (
    <div className="poker-table-container">
      <div className="table-info">
        <div className="game-status">
          <span className="round-label">{gameState.round.toUpperCase()}</span>
          <span className="pot-amount">Pot: ${gameState.pot}</span>
        </div>
        <div className={`action-log ${gameState.currentAction ? "" : "hidden"}`}>{gameState.currentAction}</div>
      </div>

      <div className="poker-table-wrapper">
        <svg className="poker-table-svg" viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="500" cy="250" rx="450" ry="225" fill="#0a7e6e" stroke="#261800" strokeWidth="15" />
          
          <ellipse cx="500" cy="250" rx="315" ry="157.5" fill="url(#darkCenter)" />
          
          <g className="seat-positions">
            <rect x="910" y="232" width="40" height="40" rx="20" ry="20" className="seat-marker"  />
            <rect x="50" y="232" width="40" height="40" rx="20" ry="20" className="seat-marker" />
          </g>
          
          <defs>
            <radialGradient id="darkCenter" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#064e45" />
              <stop offset="40%" stopColor="#076056" />
              <stop offset="70%" stopColor="#0a7e6e" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0a7e6e" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
        
        <div className="community-cards">
          {gameState.communityCards.length > 0 ? (
            gameState.communityCards.map((card, index) => (
              <div key={index} className="card-wrapper">
                {renderCard(card)}
              </div>
            ))
          ) : (
            <div className="no-cards">Waiting for cards...</div>
          )}
        </div>

        <div className="player-positions">
          {gameState.players.map((player) => (
            <div 
              key={player.position} 
              className={`player-position position-${player.position} ${player.isActive ? 'active' : 'inactive'}`}
            >
              <div className="player-info">
                <div className="player-name">{player.name}</div>
                <div className="player-chips">${player.stack}</div>
                {player.bet > 0 && <div className="player-bet">Bet: ${player.bet}</div>}
              </div>
              <div className="player-cards">
                {player.cards.map((card, index) => (
                  <div key={index} className="card-wrapper">
                    {renderCard(card)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokerTable;
