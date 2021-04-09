import React, { Component } from "react";

class RemoveAll extends Component {
  render() {
    return (
      <button
        className="btn btn-outline-primary btn-sm"
        onClick={this.props.onReset}
      >
        Reset Cart
      </button>
    );
  }
}

export default RemoveAll;
