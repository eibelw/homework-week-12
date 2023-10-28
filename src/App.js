import * as React from "react";
import { useState } from "react";
import { Container, Divider, Heading } from "@chakra-ui/react";
import "./App.css";

function Board() {
  const [nextTurn, setTurn] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  function selectSquare(square) {
    if (squares[square] || calculateWinner(squares)) {
      return;
    }
    console.log("Button clicked");
    const nextSquares = squares.slice();
    if (nextTurn) {
      nextSquares[square] = "X";
    } else {
      nextSquares[square] = "O";
    }
    setSquares(nextSquares);
    setTurn(!nextTurn);
  }

  function restart() {
    setSquares(Array(9).fill(null));
    setTurn(true);
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    );
  }

  return (
    <Container bg="#A6BB8D" css="margin-top: 100px; padding: 20px; border-radius: 50px">
      <div className="App">
        <Heading>
          <div className="App-header"> Tic-Tac-Toe </div>
        </Heading>
        <Divider />
        <div className="status"> Status </div>
        <div className="status">{calculateStatus(calculateWinner(squares), squares, nextTurn)}</div>
        <div className="board">
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
        <div className="restart">
          <button onClick={restart}>Restart here</button>
        </div>
      </div>
    </Container>
  );
}

function Game() {
  return (
    <div>
      <div>
        <Board />
      </div>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextTurn) {
  const thewinner = calculateWinner(squares);
  const thenextValue = calculateNextValue(squares);

  return thewinner ? `Winner: ${winner}` : squares.every(Boolean) ? `It's a tie` : `Next player: ${thenextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return <Game />;
}

export default App;
