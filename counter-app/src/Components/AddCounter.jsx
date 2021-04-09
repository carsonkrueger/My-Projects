import React, { Component } from "react";

class AddCounter extends Component {
  state = {};
  render() {
    return (
      <button
        className="btn btn-outline-success btn-sm m-2"
        onClick={this.props.onAdd}
      >
        ADD
      </button>
    );
  }
}

export default AddCounter;
