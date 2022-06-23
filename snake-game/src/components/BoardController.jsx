import { Component, React } from "react";
import Board from "./Board";

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
      <>
        {this.state.showBoard ? (
          <Board />
        ) : this.state.resetBoard ? (
          this.setState({ showBoard: true })
        ) : null}

        <button onClick={this.startBtn}>{this.state.buttonName}</button>
      </>
    );
  }
}

export default BoardController;
