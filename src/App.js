import React from 'react';
import './App.css';
import Header from './components/Header';
import TableList from './components/TableList';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="App-main">
        <TableList />
      </main>
      <footer className="App-footer">
        <p>&copy; {new Date().getFullYear()} Poker Arena</p>
      </footer>
    </div>
  );
}

export default App;
