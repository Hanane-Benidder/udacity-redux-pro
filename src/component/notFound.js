import React from "react";
import { Link } from "react-router-dom";
import "./notFound.css"
function notFound() {
  return (
    <div className = "notfound">
      <h1>
        <Link to="/">Return to Home Page</Link>
      </h1>
      <img src="https://www.pngkey.com/png/detail/147-1473883_404-error-404-not-found-png.png" />
    </div>
  );
}

export default notFound;
