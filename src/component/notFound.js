import React, { Fragment } from "react";
import { Link } from "react-router-dom";

function notFound() {
  return (
    <Fragment>
      <h1>
        <Link to="/">Return to Home Page</Link>
      </h1>
      <img src="https://www.pngkey.com/png/detail/147-1473883_404-error-404-not-found-png.png" />
    </Fragment>
  );
}

export default notFound;
