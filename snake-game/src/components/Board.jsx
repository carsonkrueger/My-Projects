import React, { Component, useState } from "react";
// import { Math } from "react";
import "./boardStyles.css";

class LinkedList {
  constructor(rowIdx, cellIdx) {
    this.node = new LinkedListNode(rowIdx, cellIdx);
    this.head = this.node;
  }

  has = (rowIdx, cellIdx) => {
    let tempNode = this.node;
    while (tempNode !== null) {
      if (tempNode.value.row === rowIdx && tempNode.value.col === cellIdx) {
        //console.log("FOUND", rowIdx, cellIdx);
        return true;
      }
      //console.log(tempNode.value);
      tempNode = tempNode.next;
    }
    //console.log("Null node, loop terminated");
    return false;
  };

  getNextHeadPos = (key) => {
    let pos = this.head.value;

    switch (key) {
      case "w":
        pos.row += 1;
        break;
      case "a":
        pos.col -= 1;
        break;
      case "s":
        pos.row -= 1;
        break;
      case "d":
        pos.col += 1;
        break;
      default:
        break;
    }

    return pos;
  };

  move = (key) => {
    this.head = getNextHeadPos(key);
  };
}

class LinkedListNode {
  constructor(rowIdx, cellIdx) {
    //console.log("init", rowIdx, cellIdx);
    this.value = { row: rowIdx, col: cellIdx };
    this.next = null;
  }
}

const Board = () => {
  const BOARD_SIZE = 10;
  const initSnakeIdx = Math.floor(BOARD_SIZE / 2);

  const [snake, setSnake] = useState(
    new LinkedList(initSnakeIdx, initSnakeIdx)
  );
  const [board, setBoard] = useState(CreateBoard(BOARD_SIZE, snake));

  document.addEventListener("keydown", (e) => {
    // call move function in snake to move
    snake.move(e.key);
  });
  return board;
};

const CreateBoard = (size, snake) => {
  const board = new Array(size).fill(0).map((row) => new Array(size).fill(0));

  return (
    <div className="board">
      {board.map((row, rowIdx) => (
        <div key={rowIdx} className="row">
          {row.map((cell, cellIdx) => (
            <div
              key={cellIdx}
              className={`cell${snake.has(rowIdx, cellIdx) ? "-snake" : ""}`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
