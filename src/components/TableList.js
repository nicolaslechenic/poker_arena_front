import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserFriends, FaCoins, FaCircle, FaEye, FaThList, FaTh } from 'react-icons/fa';
import './TableList.css';

const getStatusClass = (table) => {
  const playerCount = table.max_players - table.available_players;
  
  if (playerCount === 0) {
    return 'empty';
  } else if (playerCount === table.max_players) {
    return 'full';
  } else if (table.status && table.status.toLowerCase() === 'active') {
    return 'active';
  } else {
    return 'waiting';
  }
};

const TableList = () => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);
  const [viewMode, setViewMode] = useState('list');

  useEffect(() => {
    const fetchTables = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/tables');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setTables(data.tables || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching tables:', err);
        setLoading(false);
      }
    };

    fetchTables();
  }, []);

  if (loading) {
    return <div className="loading">Loading tables...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const toggleViewMode = () => {
    setViewMode(viewMode === 'list' ? 'card' : 'list');
  };

  return (
    <div className="table-list-container">
      <div className="table-list-header">
        <h2>Poker Tables</h2>
        <div className="view-toggle">
          <button 
            className={`toggle-button ${viewMode === 'list' ? 'active' : ''}`} 
            onClick={toggleViewMode}
            title="List View"
          >
            <FaThList />
          </button>
          <button 
            className={`toggle-button ${viewMode === 'card' ? 'active' : ''}`} 
            onClick={toggleViewMode}
            title="Card View"
          >
            <FaTh />
          </button>
        </div>
      </div>
      
      {tables.length === 0 ? (
        <p className="no-tables">No tables available. Create one to get started!</p>
      ) : viewMode === 'list' ? (
        <div className="table-list">
          <div className="table-list-header-row">
            <div className="table-name-header">Table Name</div>
            <div className="table-players-header">Players</div>
            <div className="table-status-header">Status</div>
            <div className="table-blinds-header">Blinds</div>
            <div className="table-actions-header">Actions</div>
          </div>
          {tables.map((table) => (
            <div key={table.name} className="table-list-item">
              <div className="table-name">{table.name}</div>
              <div className="table-players">
                <FaUserFriends className="detail-icon player-icon" />
                <span>{table.max_players - table.available_players} / {table.max_players}</span>
              </div>
              <div className="table-status">
                <FaCircle className={`detail-icon status-icon status-${getStatusClass(table)}`} />
                <span>{getStatusClass(table) || 'Waiting'}</span>
              </div>
              <div className="blinds-column">
                <div className="blinds-data">
                  <div className="blinds-row-custom">
                    <FaCoins className="detail-icon blinds-icon" />
                    <span className="blinds-label-custom">Blinds:</span>
                    <div className="blinds-value-custom">{table.small_blind} / {table.big_blind}</div>
                  </div>
                </div>
              </div>
              <div className="table-actions">
                <Link to={`/spectate/${table.id || table.name}`} className="spectate-button">
                  <FaEye className="button-icon" /> Spectate
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="table-grid">
          {tables.map((table) => (
            <div key={table.name} className="table-card">
              <h3>{table.name}</h3>
              <div className="table-details">
                <p className="detail-item">
                  <span className="icon-wrapper">
                    <FaUserFriends className="detail-icon player-icon" />
                  </span>
                  <span>
                    {table.max_players - table.available_players} / {table.max_players}
                  </span>
                </p>
                <p className="detail-item">
                  <span className="icon-wrapper">
                    <FaCircle className={`detail-icon status-icon status-${getStatusClass(table)}`} />
                  </span>
                  <span>
                    {table.status || 'Waiting'}
                  </span>
                </p>
                <p className="detail-item">
                  <span className="icon-wrapper">
                    <FaCoins className="detail-icon blinds-icon" />
                  </span>
                  <span>
                    {table.small_blind}/{table.big_blind}
                  </span>
                </p>
              </div>
              <div className="table-actions">
                <Link to={`/spectate/${table.id || table.name}`} className="spectate-button">
                  <FaEye className="button-icon" /> Spectate
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TableList;
