import "./App.css";

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import LoadingBar from "react-top-loading-bar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewsContainer from "./components/NewsContainer";

export default class App extends Component {
  state = {
    categories: [
      "business",
      "entertainment",
      "general",
      "health",
      "science",
      "sports",
      "technology",
    ],
    progress: 0,
  };

  setProgress = (p) => {
    this.setState({ progress: p });
  };
  render() {
    return (
      <Router>
        <div className="bg-gray-300">
          <LoadingBar color="#FFFFFF" progress={this.state.progress} />
          <Navbar categories={this.state.categories} />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <NewsContainer
                  setProgress={this.setProgress}
                  key={"general"}
                  pageSize={15}
                  category="general"
                  country={"in"}
                />
              }
            />
            {this.state.categories.map((el) => {
              return (
                <Route
                  exact
                  path={`/${el}`}
                  element={
                    <NewsContainer
                      setProgress={this.setProgress}
                      key={el}
                      pageSize={15}
                      category={el}
                      country={"in"}
                    />
                  }
                />
              );
            })}
          </Routes>
        </div>
      </Router>
    );
  }
}
