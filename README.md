# Poker Arena Frontend

This is a React frontend for the Poker Arena application. It allows users to view and interact with poker tables.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Poker Arena backend running on http://localhost:3000

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The application will be available at http://localhost:3001.

## Features

- View list of available poker tables
- View players & bots (coming soon)


## Backend API

The frontend communicates with the Poker Arena backend API:

- `GET /api/tables`: Get a list of all tables
- `GET /api/tables/:name`: Get details for a specific table
- `GET /api/tables/:name/spectate`: Spectate a game

## Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
