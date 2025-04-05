import React, { useState, useEffect } from 'react';
import './TableList.css';

const TableList = () => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);

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

  return (
    <div className="table-list-container">
      <div className="table-list-header">
        <h2>Poker Tables</h2>
      </div>
      
      {tables.length === 0 ? (
        <p className="no-tables">No tables available. Create one to get started!</p>
      ) : (
        <div className="table-grid">
          {tables.map((table) => (
            <div key={table.name} className="table-card">
              <h3>{table.name}</h3>
              <div className="table-details">
                <p>Players: {table.players ? table.players.length : 0}</p>
                <p>Status: {table.status || 'Waiting'}</p>
                <p>Blinds: {table.small_blind}/{table.big_blind}</p>
              </div>
              <div className="table-actions">
                <button className="spectate-button">Spectate</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TableList;
