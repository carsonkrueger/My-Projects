import React, { Component } from "react";
import NavBar from "./Components/NavBar";
import Counters from "./Components/Counters";
import "./App.css";

class App extends Component {
  state = {
    counters: [{ id: 1, value: 0 }],
  };

  handleDecrement = (counter) => {
    console.log("Decremented");
    if (counter.value !== 0) {
      counter.value -= 1;
      this.setState(this.state.counters);
    }
  };

  handleIncrement = (counter) => {
    console.log("Incremented");
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value++;

    //counter.value += 1;
    this.setState({ counters });
  };

  handleAdd = () => {
    //console.log("Handled AddCounter event");
    let size = this.state.counters.length;
    if (size === 0) {
      this.setState({ counters: [{ id: 1, value: 0 }] });
    } else {
      let nextId = this.state.counters[size - 1].id + 1;
      this.state.counters.push({ id: nextId, value: 0 });
      this.setState(this.state.counters);
    }
  };

  handleDelete = (counterId) => {
    //console.log("Handled OnDelete event");
    const counters = this.state.counters.filter((c) => c.id !== counterId);
    this.setState({ counters });
  };

  handleReset = () => {
    const counters = [{ id: 1, value: 0 }];
    this.setState({ counters });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar
          numCounters={this.state.counters.filter(
            (counter) => counter.value > 0
          )}
        ></NavBar>
        <Counters
          counters={this.state.counters}
          onIncrement={this.handleIncrement}
          onDecrement={this.handleDecrement}
          onDelete={this.handleDelete}
          onAdd={this.handleAdd}
          onReset={this.handleReset}
        />
      </React.Fragment>
    );
  }
}

export default App;
