import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PokerTable from '../components/PokerTable';
import './SpectatorPage.css';

const SpectatorPage = () => {
  const { tableId } = useParams();
  const [tableInfo, setTableInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTableInfo = async () => {
      try {
        setLoading(true);
        // Will be replaced by fetch data API
        // For now, we'll simulate a response
        setTimeout(() => {
          setTableInfo({
            id: tableId || 'demo',
            name: tableId ? `Table ${tableId}` : 'Demo Table',
            maxPlayers: 9,
            blinds: '10/20',
            status: 'active'
          });
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error fetching table info:', err);
        setError('Failed to load table information');
        setLoading(false);
      }
    };

    fetchTableInfo();
  }, [tableId]);

  if (loading) {
    return <div className="spectator-loading">Loading table...</div>;
  }

  if (error) {
    return <div className="spectator-error">{error}</div>;
  }

  return (
    <div className="spectator-page">
      <div className="spectator-header">
        <h1>Spectator Mode</h1>
        <div className="table-details">
          <span className="table-name">{tableInfo?.name}</span>
          <span className="table-blinds">Blinds: {tableInfo?.blinds}</span>
        </div>
      </div>
      
      <PokerTable tableId={tableInfo?.id} />
    </div>
  );
};

export default SpectatorPage;
