import React, { Component } from "react";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
          <span class="navbar-text">{this.props.numCounters}</span>
        </div>
      </nav>
    );
  }
}

export default NavBar;
