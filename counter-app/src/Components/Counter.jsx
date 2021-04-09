import React, { Component } from "react";

class Counter extends Component {
  getCountFormat() {
    let clssName = "badge m-2 badge-";
    clssName += this.props.counter.value === 0 ? "warning" : "primary";
    return clssName;
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <button
            onClick={() => this.props.onDecrement(this.props.counter)}
            className="btn btn-secondary btn-sm"
          >
            -
          </button>

          <span className={this.getCountFormat()}>
            {this.props.counter.value}
          </span>

          <button
            onClick={() => this.props.onIncrement(this.props.counter)}
            className="btn btn-secondary btn-sm"
          >
            +
          </button>

          <button
            onClick={() => this.props.onDelete(this.props.counter.id)}
            className="btn btn-danger btn-sm m-2"
          >
            Delete
          </button>
        </div>
      </React.Fragment>
    );
  }
}
export default Counter;
