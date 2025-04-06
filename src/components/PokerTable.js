import React, { useState, useEffect } from 'react';
import './PokerTable.css';

const PokerTable = ({ tableId }) => {
  const [gameState, setGameState] = useState({
    players: [
      { position: 0, name: 'Waiting...', stack: 0, bet: 0, cards: [], isActive: true },
      { position: 1, name: 'Waiting...', stack: 0, bet: 0, cards: [], isActive: true }
    ],
    communityCards: [],
    pot: 0,
    currentAction: '',
    round: 'waiting'
  });

  const [gameData, setGameData] = useState(null);
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch game data
  useEffect(() => {
    const fetchGameData = async () => {
      try {
        // This will be replace by fetch from API
        // For now, we'll use the example data structure
        const exampleData = {
          "sets": [
            {
              "positions": {
                "0": "Vilain",
                "1": "Hero"
              },
              "games": [
                {
                  "actions": [
                    { 
                      "pseudo": "Vilain", 
                      "stack": 99.5,
                      "action": "bet",
                      "value": 0.5, 
                      "cards": [],
                      "pot": 0.5
                    },
                    { 
                      "pseudo": "Hero", 
                      "stack": 99, 
                      "action": "bet",
                      "value": 1, 
                      "cards": [],
                      "pot": 1.5
                    }
                  ],
                  "board": [],
                  "round": "blind"
                },
                {
                  "actions": [
                    { 
                      "pseudo": "Vilain", 
                      "stack": 99,
                      "action": "call",
                      "value": 0.5, 
                      "cards": ["xX", "xX"],
                      "pot": 2
                    },
                    { 
                      "pseudo": "Hero", 
                      "stack": 99, 
                      "action": "check",
                      "value": 0, 
                      "cards": ["xX", "xX"],
                      "pot": 2
                    }
                  ],
                  "board": [],
                  "round": "preflop"
                },
                {
                  "actions": [
                    { 
                      "pseudo": "Vilain", 
                      "stack": 97.5,
                      "action": "bet",
                      "value": 1.5, 
                      "cards": ["xX", "xX"],
                      "pot": 3.5
                    },
                    { 
                      "pseudo": "Hero", 
                      "stack": 97.5, 
                      "action": "call",
                      "value": 1.5, 
                      "cards": ["xX", "xX"],
                      "pot": 5
                    }
                  ],
                  "board": ["♥A", "♦K", "♣7"],
                  "round": "flop"
                },
                {
                  "actions": [
                    { 
                      "pseudo": "Vilain", 
                      "stack": 94,
                      "action": "bet",
                      "value": 3.5, 
                      "cards": ["xX", "xX"],
                      "pot": 8.5
                    },
                    { 
                      "pseudo": "Hero", 
                      "stack": 94, 
                      "action": "call",
                      "value": 3.5, 
                      "cards": ["xX", "xX"],
                      "pot": 12
                    }
                  ],
                  "board": ["♥A", "♦K", "♣7", "♦Q"],
                  "round": "turn"
                },
                {
                  "actions": [
                    { 
                      "pseudo": "Vilain", 
                      "stack": 84,
                      "action": "bet",
                      "value": 10, 
                      "cards": ["xX", "xX"],
                      "pot": 22
                    },
                    { 
                      "pseudo": "Hero", 
                      "stack": 84, 
                      "action": "call",
                      "value": 10, 
                      "cards": ["xX", "xX"],
                      "pot": 32
                    }
                  ],
                  "board": ["♥A", "♦K", "♣7", "♦Q", "♦10"],
                  "round": "river"
                },
                {
                  "actions": [
                    { 
                      "pseudo": "Vilain", 
                      "stack": 84,
                      "action": "showdown",
                      "value": 0, 
                      "cards": ["♥J", "♦8"],
                      "pot": 32
                    },
                    { 
                      "pseudo": "Hero", 
                      "stack": 84, 
                      "action": "showdown",
                      "value": 0, 
                      "cards": ["♦7", "♦9"],
                      "pot": 32
                    }
                  ],
                  "board": ["♥A", "♦K", "♣7", "♦Q", "♦10"],
                  "round": "showdown"
                }
              ]
            }
          ]
        };
        
        setGameData(exampleData);
        setLoading(false);
        
        if (exampleData.sets && exampleData.sets.length > 0) {
          simulateGameProgress(exampleData.sets[0]);
        }
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
        // Reset after a delay
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
        <h2>Table {tableId || 'Demo'}</h2>
        <div className="game-status">
          <span className="round-label">{gameState.round.toUpperCase()}</span>
          <span className="pot-amount">Pot: ${gameState.pot}</span>
        </div>
        <div className="action-log">{gameState.currentAction}</div>
      </div>

      <div className="poker-table">
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
