import React, { Component } from "react";
import spinner from "../spinner.gif";
export default class Spinner extends Component {
  render() {
    return (
      <div className="d-flex align-items-center justify-content-center">
        <img src={spinner} alt="spinner" />
      </div>
    );
  }
}
