import { React, useContext } from "react";
import userContext from "./userContext";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

/*
 *  Renders the Navbar
 *  State:
 *  none
 *
 *
 * Props:
 *  logout function
 *
 *
 * App -> Navbar
 */

export default function Navbar({ logout }) {
  const { userDetail } = useContext(userContext);

  function loggedInView() {
    return (
      <div className="Navbar">
        <NavLink className="Navbar_Left" to="/">Jobly</NavLink>
        <NavLink className="Navbar_Right_Companies" to="/companies">Companies</NavLink>
        <NavLink className="Navbar_Right_Jobs" to="/jobs">Jobs</NavLink>
        <NavLink className="Navbar_Right_Profile" to="/profile">Profile</NavLink>
        <NavLink className="Navbar_Right_Logout" to="/" onClick={logout}>Logout {userDetail.user.username}</NavLink>
      </div>
    );
  }

  function notLoggedInView() {
    return (
      <div className="Navbar">
        <NavLink className="Navbar_Left" to="/">Jobly</NavLink>
        <NavLink className="Navbar_Right_Login" to="/login">Login</NavLink>
        <NavLink className="Navbar_Right_Signup" to="/signup">Signup</NavLink>
      </div>
    );
  }

  return (
    <div>
      {userDetail ? loggedInView() : notLoggedInView()}
    </div>
  );
}
