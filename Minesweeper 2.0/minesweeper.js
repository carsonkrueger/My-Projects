//document.addEventListener("DOMContentLoaded", () => {
const loginDiv = document.getElementById("login");
const modes = document.getElementById("modes");
const rules = document.getElementById("rules");
const grid = document.getElementById("theGrid");
const button = document.getElementById("start");
const body = document.getElementById("theBody");
const storageParagraph = document.getElementById("storage");
const clearButton = document.getElementById("clearButton");
const parsedData = document.getElementById("parsedData");

let gameBoard = [];
const width = 20;
const bombAmount = 50;
const emptyAmount = width * width - bombAmount;

const bombBoard = Array(bombAmount).fill("b");
const emptyBoard = Array(emptyAmount).fill("e");
let shuffledBoard = emptyBoard.concat(bombBoard);

const form = {
  username: document.getElementById("loginUser"),
  password: document.getElementById("loginPass"),
  submit: document.getElementById("loginBtn"),
  errorMsg: document.getElementById("loginError"),
};

form.submit.addEventListener("click", (ev) => {
  const data =
    "userName=" + form.username.value + "&password=" + form.password.value;

  let request = new XMLHttpRequest();
  request.open(
    "POST",
    (url =
      "http://universe.tc.uvu.edu/cs2550/assignments/PasswordCheck/check.php")
  );
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  request.send(data);

  request.onload = () => {
    let response = null;

    try {
      response = JSON.parse(request.responseText);
      form.errorMsg.innerHTML = response.result + " username/password";
      if (response.result === "valid") {
        doJsonServerThing();
        buildGrid();

        loginDiv.style.display = "none";
        rules.style.display = "flex";
        modes.style.display = "flex";
        clearButton.style.display = "flex";

        localStorage.setItem("cs2550timestamp", response.timestamp);
        let timestamp = localStorage.getItem("cs2550timestamp");
        storageParagraph.innerHTML = "Timestamp: " + timestamp;
      } else if (response.result === "invalid") {
        form.errorMsg.style.color = "red";
      }
    } catch (error) {
      console.log(error);
    }
    //form.errorMsg.value = request.responseText;
  };
});

function doJsonServerThing() {
  let req = new XMLHttpRequest();

  req.onreadystatechange = function () {
    let resp = this.responseText;
    let obj = JSON.parse(resp).gameBoardy;
    
    shuffledBoard = [];
    obj.forEach((el) => {
      //console.log(el.isBomb);
        shuffledBoard.push(el.isBomb) 
      }
    );
    parsedData.innerHTML = resp;
  };

  req.open("GET", (url = "gameBoardy.json"), false);
  req.send();
}

clearButton.addEventListener("click", (ev) => {
  localStorage.clear();
  storageParagraph.innerHTML = "";
});

// function shuffle() {  <----------------------------------------------------------MAKE SURE TO UNCOMMENT
//   shuffledBoard.sort(() => Math.random() - 0.5);
//   gameBoard = [];
//   //console.log(shuffledBoard);
// }

function buildGrid() {
  //shuffle();    <----------------------------------------------------------MAKE SURE TO UNCOMMENT
  //button.innerHTML = "RESET";
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
    Gameover();
    sqr.src = "bomb.png"; // <-------------------- GAMEOVER
    console.log("GAMEOVER... not implemented yet");
  } else {
    // IF sqr IS NOT A BOMB
    calcBombsNearRecursively(sqr);
  }
}

function calcBombsNearRecursively(sqr) {
  //WILL FIND NUMBER OF BOMBS NEAR A SQUARE AND PRINT IT ON SQUARE OR CLEAR TILES IF NO BOMBS ARE NEAR
  let id = Number(sqr.id);
  let bombsNear = 0;
  bombsNear = findBombs(id); // calcs bombs near sqr

  if (bombsNear == 0) {
    sqr.parentNode.innerHTML = "";
    clearTilesNear(id); // <-------- RECURSIVELY CLEARS TILES NEAR
  } else {
    sqr.parentNode.innerHTML = String(bombsNear);
  }
}

function clearTilesNear(oldId) {
  //RECURSIVE
  const indexes = [-1, -20, +20, +1];

  indexes.forEach((el) => {
    if (oldId % 20 === 0 && el === -1) {
      return;
    } else if ((oldId - 19) % 20 === 0 && el === 1) {
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

    if (findBombs(newId) === 0) {
      newSqr.parentNode.innerHTML = "";
      clearTilesNear(newId);
    } else {
      newSqr.parentNode.innerHTML = findBombs(newId);
    }
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

function Gameover() {
  //let transparentDiv = document.createElement("div");
  //transparentDiv.setAttribute("id", "tdiv");
  //body.appendChild(transparentDiv);
}
//});
