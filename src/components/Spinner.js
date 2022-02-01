import React, { Component } from "react";

export default class Spinner extends Component {
  render() {
    return (
      <div className={`flex justify-center items-center ${this.props.padding}`}>
        <div
          class={`${this.props.widthHeight} border-4 border-t-transparent border-purple-600 border-dotted rounded-full animate-spin`}
        ></div>
      </div>
    );
  }
}
