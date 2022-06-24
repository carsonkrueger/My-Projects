import { Component, Fragment, React } from "react";
import Board from "./Board";
import "../styles/boardController.css";

class BoardController extends Component {
  state = {
    showBoard: false,
    resetBoard: false,
    buttonName: "Start",
  };

  startBtn = () => {
    //Reset Board
    if (this.state.showBoard) {
      this.setState({ showBoard: false, resetBoard: true });
    }

    // Initialize Board
    else {
      this.setState({ showBoard: true, buttonName: "Reset" });
      //document.getElementById("strBtn").textContent = "Reset";
    }
  };

  render() {
    return (
      <div id="controller">
        <button id="start-btn" onClick={this.startBtn}>
          {this.state.buttonName}
        </button>

        {this.state.showBoard ? (
          <Board />
        ) : this.state.resetBoard ? (
          this.setState({ showBoard: true })
        ) : null}
      </div>
    );
  }
}

export default BoardController;
