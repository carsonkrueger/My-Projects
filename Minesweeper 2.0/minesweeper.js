//document.addEventListener("DOMContentLoaded", () => {
//const loginDiv = document.getElementById("login");
let gameoverDiv = document.getElementById("gameoverDiv");
const modes = document.getElementById("modes");
const rules = document.getElementById("rules");
const grid = document.getElementById("theGrid");
const button = document.getElementById("start");
const body = document.getElementById("theBody");
// const storageParagraph = document.getElementById("storage");
// const clearButton = document.getElementById("clearButton");
// const parsedData = document.getElementById("parsedData");

let gameBoard = [];
const width = 20;
const bombAmount = 50;
const emptyAmount = width * width - bombAmount;

let flagScore = 0;
let uncoverScore = 0;

const bombBoard = Array(bombAmount).fill("b");
const emptyBoard = Array(emptyAmount).fill("e");
let shuffledBoard = emptyBoard.concat(bombBoard);

localStorage.setItem("time", Date());
let timestamp = localStorage.getItem("time");
// storageParagraph.innerHTML = "Current Date: " + timestamp;

doJsonServerThing();
buildGrid();

rules.style.display = "flex";
// clearButton.style.display = "flex";

// function doJsonServerThing() {
//   let req = new XMLHttpRequest();

//   req.onreadystatechange = function () {
//     let resp = this.responseText;
//     let theString = "";
//     let obj = JSON.parse(resp).randomString;
//     obj.forEach((el) => {
//       theString += el.txt + " ";
//     });
//     parsedData.innerHTML = theString;
//     //console.log(resp);
//   };

//   req.open("GET", (url = "gameBoardy.json"), false);
//   req.send();
// }

// clearButton.addEventListener("click", (ev) => {
//   localStorage.clear();
//   storageParagraph.innerHTML = "";
// });

function shuffle() {
  shuffledBoard.sort(() => Math.random() - 0.5);
  gameBoard = [];
  //console.log(shuffledBoard);
}

function buildGrid() {
  flagScore = 0;
  uncoverScore = 0;

  gameoverDiv.style.display = "none";
  shuffle();
  button.innerHTML = "RESET";
  theGrid.style = "border: grey solid 4px;";
  grid.innerHTML = ""; //deconstructs for resetting

  for (let i = 0; i < width * width; i++) {
    const tile = document.createElement("div");
    //tile.setAttribute("id", i);

    const tileImg = document.createElement("img");
    tileImg.src = "covered.png";
    const theImgPath = tileImg.src;
    tileImg.setAttribute("id", i);
    tileImg.setAttribute("class", "tiles");
    tileImg.setAttribute("onclick", "uncover(this)");
    tileImg.addEventListener(
      "contextmenu",
      (ev) => {
        ev.preventDefault();
        tileImg.src =
          tileImg.src === theImgPath ? "flagged.png" : "covered.png";
        flagScore += tileImg.src === theImgPath ? -1 : 1;
        if (uncoverScore === emptyAmount && flagScore === bombAmount) {
          Win();
          return;
        }
      },
      false
    );

    gameBoard.push(tileImg);
    grid.appendChild(tile).appendChild(tileImg);
  }
}

function uncover(sqr) {
  let id = sqr.id;
  let isBomb = shuffledBoard[id] === "b" ? true : false;

  if (isBomb) {
    sqr.src = "bomb.png"; // GAMEOVER
    Gameover();
  } else {
    // IF sqr IS NOT A BOMB
    if (uncoverScore === emptyAmount && flagScore === bombAmount) {
      Win();
      return;
    }
    calcBombsNearRecursively(sqr); // Clear tiles and calc bombs near tile
  }
}

function calcBombsNearRecursively(sqr) {
  /* WILL FIND NUMBER OF BOMBS NEAR A SQUARE AND PRINT IT ON SQUARE OR CLEAR 
  TILES IF NO BOMBS ARE NEAR */
  let id = Number(sqr.id);
  let bombsNear = 0;
  bombsNear = findBombs(id); // calcs bombs near sqr

  if (bombsNear == 0) {
    sqr.parentNode.innerHTML = "";
    uncoverScore += 1;
    clearTilesNear(id); // <-------- RECURSIVELY CLEARS TILES NEAR
  } else {
    uncoverScore += 1;
    //console.log(uncoverScore);
    sqr.parentNode.innerHTML = String(bombsNear);
  }
}

function clearTilesNear(oldId) {
  //RECURSIVE
  const indexes = [-1, -20, +20, +1];
  // const topIndexes = [-19, -21];
  // const rightIndexes = [-19, 21];
  // const bottomIndexes = [19, 21];
  // const leftIndexes = [19, -21];

  indexes.forEach((el) => {
    if (oldId % 20 === 0 && el === -1) {
      // if on edge
      return;
    } else if ((oldId - 19) % 20 === 0 && el === 1) {
      // if on edge
      return;
    }

    let newSqr = 0;
    let newId = 0;

    try {
      newSqr = gameBoard[oldId + el];
      newId = Number(newSqr.id);
      newSqr.parentNode.innerHTML;
    } catch (error) {
      return;
    }

    uncoverScore += 1;
    numBombsNearTile = findBombs(newId);

    if (numBombsNearTile === 0) {
      newSqr.parentNode.innerHTML = "";
      clearTilesNear(newId);
    } else {
      newSqr.parentNode.innerHTML = numBombsNearTile;
    }
    // else if ((oldId - newId) === 1){

    //   newSqr.parentNode.innerHTML = findBombs(newId);
    // }
  });
}

function findBombs(id) {
  const indexes = [+19, -1, -21, -20, +20, -19, +1, +21];
  let bombsNear = 0;
  if (id % 20 === 0) {
    //if sqr is on LEFT side of board
    for (i = 3; i < 8; i++) {
      //loops thru last 5 in indexes list, to avoid finding bombs on other side of board
      bombsNear += shuffledBoard[id + indexes[i]] === "b" ? 1 : 0;
    }
  } else if ((id - 19) % 20 == 0) {
    //if sqr is on RIGHT side of board
    for (i = 0; i < 5; i++) {
      //loops thru first 5 in indexes list, to avoid finding bombs on other side of board
      bombsNear += shuffledBoard[id + indexes[i]] === "b" ? 1 : 0;
    }
  } else {
    indexes.forEach(
      (ele) => (bombsNear += shuffledBoard[id + ele] === "b" ? 1 : 0)
    );
  }

  return bombsNear;
}

function Win() {
  gameoverDiv.innerHTML = "YOU WIN!";
  grid.style.pointerEvents = "none";
  gameoverDiv.style.display = "flex";
  gameoverDiv.style.color = "green";
}

function Gameover() {
  gameoverDiv.innerHTML = "GAME OVER";
  grid.style.pointerEvents = "none";
  gameoverDiv.style.display = "flex";
  gameoverDiv.style.color = "red";
}
//});
