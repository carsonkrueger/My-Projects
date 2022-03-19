import React, { useState, useEffect } from "react";
// import { Math } from "react";
import "./boardStyles.css";

const Board = () => {
  const BOARD_SIZE = 10;
  const initSnakeIdx = Math.floor(BOARD_SIZE / 2) + 1;
  //console.log(initSnakeIdx);

  const [snake, setSnake] = useState([[initSnakeIdx, initSnakeIdx]]); // front of array is head, back of array is tail
  const [board, setBoard] = useState(CreateBoard(BOARD_SIZE));
  const [apple, setApple] = useState([5, 2]);
  const [direction, setDirection] = useState(
    new KeyboardEvent("keydown", { key: "w" })
  );

  useEffect(() => {
    window.addEventListener("keydown", setDirection);

    const intervalId = window.setInterval(() => {
      move();
    }, 400);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("keydown", setDirection);
    };
  }, [snake]);

  const move = () => {
    //console.log("Move method", direction.key);
    let newHead = [];
    let newSnake = [...snake];
    //console.log(newSnake);

    switch (direction.key) {
      case "w": // UP
        newHead = [snake[0][0] - 1, snake[0][1]]; // Next head position
        // console.log("moved UP");
        break;
      case "a": // LEFT
        newHead = [snake[0][0], snake[0][1] - 1]; // Next head position
        // console.log("moved LEFT");
        break;
      case "s": // DOWN
        newHead = [snake[0][0] + 1, snake[0][1]]; // Next head position
        // console.log("moved DOWN");
        break;
      case "d": // RIGHT
        newHead = [snake[0][0], snake[0][1] + 1]; // Next head position
        // console.log("moved RIGHT");
        break;
      default:
        return;
    }

    newSnake.unshift(newHead); // Insert new head into snake

    if (snake.length >= 3) {
      // dont remove tail at beginning to grow snake to 3 squares
      newSnake.pop(); // remove tail to simulate movement
    }
    setSnake(newSnake);
    //console.log(snake);
  };

  const isInBounds = (row, col) => {
    if (row < 0 || row >= BOARD_SIZE) {
      return false;
    } else if (col < 0 || col >= BOARD_SIZE) {
      return false;
    }
    return true;
  };

  const isSnake = (rowIdx, colIdx) => {
    for (let snkIdx = 0; snkIdx < snake.length; snkIdx++) {
      const snakePiece = snake[snkIdx];

      if (snakePiece[0] === rowIdx && snakePiece[1] === colIdx) {
        // console.log("FOUND SNAKE PIECE", snakePiece);
        return true;
      }
    }
    return false;
  };

  const isApple = (row, col) => {
    if (apple[0] === row && apple[1] == col) {
      return true;
    }
    return false;
  };

  const createApple = () => {
    let row = Math.floor(Math.random() * BOARD_SIZE);
    let col = Math.floor(Math.random() * BOARD_SIZE);

    if (isSnake(row, col)) createApple();
    return [row, col];
  };

  return (
    <div className="board">
      {board.map((row, rowIdx) => (
        <div key={rowIdx} className="row">
          {row.map((cell, cellIdx) => (
            <div
              key={cellIdx}
              className={`cell${
                isSnake(rowIdx, cellIdx)
                  ? "-snake"
                  : isApple(rowIdx, cellIdx)
                  ? "-apple"
                  : ""
              }`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

const CreateBoard = (size) => {
  const board = new Array(size).fill("").map((row) => new Array(size).fill(""));
  return board;
};

export default Board;
