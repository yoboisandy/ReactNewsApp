import "./App.css";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import LoadingBar from "react-top-loading-bar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewsContainer from "./components/NewsContainer";

const App = () => {
  const [categories, setCategories] = useState([
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ]);
  const [progress, setProgress] = useState(0);

  const assignProgress = (p) => {
    setProgress(p);
  };

  return (
    <Router>
      <div className="bg-gray-300">
        <LoadingBar color="#FFFFFF" progress={progress} />
        <Navbar categories={categories} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <NewsContainer
                assignProgress={assignProgress}
                key={"general"}
                pageSize={15}
                category="general"
                country={"in"}
              />
            }
          />
          {categories.map((el) => {
            return (
              <Route
                exact
                path={`/${el}`}
                element={
                  <NewsContainer
                    assignProgress={assignProgress}
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
};
export default App;
