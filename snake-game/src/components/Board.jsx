import React, { Component, useState } from "react";
import Math from "react";
import "./boardStyles.css";

const Board = () => {
  const BOARD_SIZE = 10;
  const initSnakeIdx = Math.floor(BOARD_SIZE / 2);

  const [board, setBoard] = useState(CreateBoard(BOARD_SIZE));
  const [snake, setSnake] = useState(
    LinkedList({ initSnakeIdx: initSnakeIdx })
  );

  return board;
};

const CreateBoard = (size) => {
  const board = new Array(size).fill(0).map((row) => new Array(size).fill(0));

  return (
    <div className="board">
      {board.map((row, rowIdx) => (
        <div key={rowIdx} className="row">
          {row.map((cell, cellIdx) => (
            <div
              key={cellIdx}
              className={`cell${
                Board.snake.node.has({ rowIdx, cellIdx }) ? "-snake" : ""
              }`}
            ></div>
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

  has = (rowIdx, cellIdx) => {
    let tempNode = this.node;
    while (tempNode.next !== null) {
      if (tempNode.value === { rowIdx, cellIdx }) {
        return true;
      }
      tempNode = this.node.next;
    }
    return false;
  };
}

class LinkedListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

export default Board;
