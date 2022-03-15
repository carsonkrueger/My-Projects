import React, { useState, useEffect } from "react";
// import { Math } from "react";
import "./boardStyles.css";

const Board = () => {
  const BOARD_SIZE = 10;
  const initSnakeIdx = Math.floor(BOARD_SIZE / 2);
  console.log(initSnakeIdx);

  const [snake, setSnake] = useState([[initSnakeIdx, initSnakeIdx]]); // front of array is head, back of array is tail
  const [board, setBoard] = useState(CreateBoard(BOARD_SIZE));
  console.log(snake);

  useEffect(() => {
    window.addEventListener("keydown", move);

    return () => {
      window.removeEventListener("keydown", move);
    };
  }, [snake]);

  const move = (e) => {
    // console.log("Move method", e);
    let newHead = [];
    let newSnake = [...snake];

    switch (e.key) {
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
    }

    newSnake.unshift(newHead); // Insert new head into snake
    newSnake.pop(); // remove tail to simulate movement
    setSnake(newSnake);
    // console.log(snake);
  };

  const isSnake = (rowIdx, colIdx) => {
    for (let snkIdx = 0; snkIdx < snake.length; snkIdx++) {
      const snakePiece = snake[snkIdx];

      if (snakePiece[0] === rowIdx && snakePiece[1] === colIdx) {
        // console.log("FOUND SNAKE PIECE", snakePiece);
        return true;
      }
      //console.log(snakePiece)
      return false;
    }
  };

  return (
    <div className="board">
      {board.map((row, rowIdx) => (
        <div key={rowIdx} className="row">
          {row.map((cell, cellIdx) => (
            <div
              key={cellIdx}
              className={`cell${isSnake(rowIdx, cellIdx) ? "-snake" : ""}`}
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
