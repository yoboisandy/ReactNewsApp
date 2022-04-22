import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = (props) => {
  const handleHamMenu = () => {
    const mdNav = document.querySelector("#md-nav");
    const smNav = document.querySelector("#sm-nav");
    smNav.classList.toggle("hidden");
  };

  const handleMenuMouseOver = () => {
    document.querySelector(".subMenu").classList.remove("hidden");
  };
  const handleMenuMouseOut = () => {
    document.querySelector(".subMenu").classList.add("hidden");
  };

  return (
    <header className="text-gray-100 sticky top-0 right-0 left-0 z-10 body-font">
      <div className=" shadow-lg bg-purple-600 mx-auto flex flex-wrap py-2 px-4 md:px-6 justify-between md:flex-row items-center">
        <Link
          to="/"
          className="flex title-font font-medium items-center text-gray-900  md:mb-0"
        >
          <span className="ml-3 text-xl text-white">Sandy News</span>
        </Link>
        <nav
          id="md-nav"
          className="md:ml-auto hidden md:flex flex-wrap items-center text-base justify-center space-x-2"
        >
          <Link
            to="/"
            className=" font-bold md:hover:bg-purple-700 md:p-2 hover:rounded cursor-pointer"
          >
            Home
          </Link>
          <span
            onMouseOver={handleMenuMouseOver}
            className="font-bold md:hover:bg-purple-700 md:p-2 hover:rounded cursor-pointer"
          >
            <span className="menu flex items-center justify-between ">
              <span>Categories</span>
              <span>
                <svg
                  className="fill-current h-4 w-4 font-bold"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
                </svg>
              </span>
            </span>
            <div
              onMouseOut={handleMenuMouseOut}
              className="subMenu absolute hidden rounded-b-lg space-y-0.5 mt-4 list-none bg- text-white font-bold bg-purple-600 "
            >
              {props.categories.map((e) => {
                return (
                  <li
                    key={e}
                    className="md:hover:bg-purple-700 md:p-2 hover:rounded cursor-pointer"
                  >
                    <NavLink to={`/${e}`}>
                      {e.charAt(0).toUpperCase() + e.slice(1)}
                    </NavLink>
                  </li>
                );
              })}
            </div>
          </span>
        </nav>

        <div className="flex space-x-4 cursor-pointer" onClick={handleHamMenu}>
          <button className="space-y-1 md:hidden  flex flex-col justify-center">
            <div className="border-b-4 border-white w-8 rounded-full"></div>
            <div className="border-b-4 border-white w-8 rounded-full"></div>
            <div className="border-b-4 border-white w-8 rounded-full"></div>
          </button>
          <button className="sm:inline-flex items-center hidden bg-purple-500 border-0 py-1 px-3 focus:outline-none hover:bg-purple-700 rounded font-bold text-base md:mt-0 ">
            Subscribe
            {/* <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg> */}
          </button>
        </div>
      </div>
      <nav
        id="sm-nav"
        className="md:ml-auto w-40 md:hidden flex hidden bg-purple-600 absolute right-0  flex-col items-center text-base space-y-7 justify-center py-4"
      >
        <Link
          to="/"
          className=" font-bold md:hover:bg-purple-700 md:p-2 hover:rounded cursor-pointer"
        >
          Home
        </Link>
        <span
          onClick={handleMenuMouseOver}
          className="font-bold space-y-7 md:hover:bg-purple-700 md:p-2 hover:rounded cursor-pointer"
        >
          {props.categories.map((e) => {
            return (
              <li
                key={e}
                className="md:hover:bg-purple-700 md:p-2 hover:rounded list-none text-center cursor-pointer"
              >
                <NavLink to={`/${e}`}>
                  {e.charAt(0).toUpperCase() + e.slice(1)}
                </NavLink>
              </li>
            );
          })}
        </span>
        <button className="inline-flex items-center sm:hidden bg-purple-500 border-0 py-1 px-3 focus:outline-none hover:bg-purple-700 rounded font-bold text-base md:mt-0 ">
          Subscribe
          {/* <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg> */}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
