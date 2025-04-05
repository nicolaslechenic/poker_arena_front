import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">♠</span>
          <h1>Poker Arena</h1>
        </div>
        <nav className="nav">
          <ul>
            <li>
              <Link to="/" className={path === '/' ? 'active' : ''}>
                Tables
              </Link>
            </li>
            <li>
              <Link to="/players" className={path === '/players' ? 'active' : ''}>
                Players
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
