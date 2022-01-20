import React, { Component } from "react";
import "./boardStyles.css";

const Board = () => {
  const BOARD_SIZE = 10;
  let board = new Array(BOARD_SIZE)
    .fill(0)
    .map((row) => new Array(BOARD_SIZE).fill(0));

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

class SnakeLinkedList {
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

export default Board;
