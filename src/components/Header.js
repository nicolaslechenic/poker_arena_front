import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">♠</span>
          <h1>Poker Arena</h1>
        </div>
        <nav className="nav">
          <ul>
            <li><a href="/" className="active">Tables</a></li>
            <li><a href="/players">Players</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
