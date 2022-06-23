import { Component, React, useEffect } from "react";
import Board from "./Board";

class App extends Component {
  state = {};

  startBtn = () => {};
}

// const BoardController = () => {
//   const [doBoard, setDoBoard] = useEffect(true);

//   const SetBoard = () => {
//     console.log("method: setBoard");

//     if (doBoard === true) {
//       return <Board />;
//     } else {
//       return <div></div>;
//     }
//   };

//   useEffect(() => {}, [doBoard]);

//   const changeDoSetBoardStatus = () => {
//     setDoBoard = true;
//     //SetBoard();
//     //$(".start-button").textContent = "Reset";
//   };

//   return (
//     <>
//       <SetBoard />
//       <button key="start-button" onClick={changeDoSetBoardStatus}>
//         Start
//       </button>
//     </>
//   );
// };

// export default BoardController;
