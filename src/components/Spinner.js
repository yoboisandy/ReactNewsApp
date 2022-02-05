import React, { Component } from "react";

const Spinner = (props) => {
  return (
    <div className={`flex justify-center items-center ${props.padding}`}>
      <div
        class={`${props.widthHeight} border-4 border-t-transparent border-purple-600 border-dotted rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default Spinner;
