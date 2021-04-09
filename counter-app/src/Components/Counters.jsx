import React, { Component } from "react";
import Counter from "./Counter";
import AddCounter from "./AddCounter";
import RemoveAll from "./RemoveAllCounters";

class Counters extends Component {
  render() {
    return (
      <div>
        {this.props.counters.map((counter) => (
          <Counter
            key={counter.id}
            counter={counter}
            onDelete={this.props.onDelete}
            onIncrement={this.props.onIncrement}
            onDecrement={this.props.onDecrement}
            onDelete={this.props.onDelete}
          />
        ))}
        <AddCounter onAdd={this.props.onAdd} />
        <RemoveAll onReset={this.props.onReset} />
      </div>
    );
  }
}

export default Counters;
