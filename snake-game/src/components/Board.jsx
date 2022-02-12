import React, { Component, useState } from "react";
import "./boardStyles.css";

const Board = () => {
  const BOARD_SIZE = 10;
  let [board, setBoard] = useState(CreateBoard(BOARD_SIZE));
  //let [snake, setSnake] = useState(Snake());

  return board;
};

const CreateBoard = (size) => {
  const board = new Array(size).fill(0).map((row) => new Array(size).fill(0));

  return (
    <div className="board">
      {board.map((row, rowIdx) => (
        <div key={rowIdx} className="row">
          {row.map((cell, cellIdx) => (
            <div key={cellIdx} className="cell"></div>
          ))}
        </div>
      ))}
    </div>
  );
};

class LinkedList {
  constructor(value) {
    const node = LinkedListNode(value);
    this.head = node;
  }
}

class LinkedListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// const Snake = () => {
//   let defaultSnakeIndex = Math.floor(Board.BOARD_SIZE / 2);

//   console.log(Board.board[defaultSnakeIndex][defaultSnakeIndex]);
// };

export default Board;
