import React, { Component } from "react";

export default class NewsCatalog extends Component {
  render() {
    let { title, description, image, source, date, url } = this.props;
    return (
      <div className="container w-100 lg:w-4/5 mx-auto flex flex-col">
        <div className="flex flex-col md:flex-row overflow-hidden bg-white rounded-lg shadow-xl  mt-4 w-100 mx-2">
          <span className="bg-purple-600 bg-opacity-50 text-white absolute px-2 py-1 rounded-tl-lg">
            {source}
          </span>
          <div className="h-64 md:w-1/3 w-full">
            <img
              className="inset-0 h-full w-full object-cover object-center"
              src={image}
              alt={"pic"}
            />
          </div>
          <div className="md:w-2/3 w-full py-4 px-6 text-gray-800 flex flex-col justify-between">
            <h3 className="font-semibold text-lg leading-tight ">{title}</h3>
            <p className="mt-2">{description}</p>
            <a
              href={url}
              target="_blank"
              className="p-2 bg-purple-600 w-24 text-white rounded"
            >
              Read More
            </a>
            <p className="text-sm text-gray-700 uppercase tracking-wide font-semibold mt-2">
              {date}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
