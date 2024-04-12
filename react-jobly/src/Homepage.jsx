import { React, useContext } from "react";
import userContext from "./userContext";
import { Link } from "react-router-dom";
import "./Homepage.css";

/**
 * Renders homepage.
 *
 * State:
 * none
 *
 * Props:
 * none
 *
 * App -> RoutesList -> Homepage
 */

export default function Homepage() {
  const { userDetail } = useContext(userContext);

  function loggedInView() {
    return (
      <div className="Homepage">
        <h1>Welcome {userDetail.user.firstName}</h1>
      </div>
    );
  }

  function loggedOutView() {
    return (
      <div className="Homepage-user">
        <h1 className="Homepage-title">Jobly!</h1>
        <h3 className="Homepage-sub-title">
          All the jobs in one, convenient place.
        </h3>
        <div className="buttons-container">
          <Link to="/login" className="Homepage-buttons1">
            Login
          </Link>
          <Link to="/signup" className="Homepage-buttons2">
            Sign Up
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="Homepage-anon">
      <div>{userDetail ? loggedInView() : loggedOutView()}</div>
    </main>
  );
}
