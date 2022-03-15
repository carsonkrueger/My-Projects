import React, { Component, useState, useEffect } from "react";
// import { Math } from "react";
import "./boardStyles.css";

const Board = () => {
  const BOARD_SIZE = 10;
  const initSnakeIdx = Math.floor(BOARD_SIZE / 2);
  console.log(initSnakeIdx);

  const [snake, setSnake] = useState([[initSnakeIdx, initSnakeIdx]]);
  const [board, setBoard] = useState(CreateBoard(BOARD_SIZE));

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      // call move function in snake to move
      move(e.key);
      //console.log("Moved", e.key);
    });

    return () => {
      window.removeEventListener("keydown");
    };
  }),
    [snake]; // NEED TO ADD REMOVE EVENT LISTENER

  const move = (dir) => {
    let newSnake = [];
    switch (dir) {
      case "w": // UP
        newSnake.push([snake[0][0] - 1, snake[0][1]]);
    }
    newSnake.concat(snake);
    //newSnake.pop() // remove tail to simulate movement
    setSnake(newSnake);
  };

  const snakeIncludes = (rowIdx, colIdx) => {
    for (let snkIdx = 0; snkIdx < snake.length; snkIdx++) {
      const snakePiece = snake[snkIdx];

      if ((5, 7) === (5, 6)) {
        console.log("YO");
      }

      if (snakePiece[0] === rowIdx && snakePiece[1] === colIdx) {
        console.log("FOUND SNAKE PIECE", snakePiece);
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
              className={`cell${
                snakeIncludes(rowIdx, cellIdx) ? "-snake" : ""
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
