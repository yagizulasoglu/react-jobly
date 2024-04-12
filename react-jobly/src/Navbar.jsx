import {React, useContext} from "react"
import userContext from "./userContext";
import { NavLink } from "react-router-dom";

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

export default function Navbar({logout}) {
  const { userDetail } = useContext(userContext);
  //TODO: possible func. decomposition here for what links the user can access. "function navLinksForLogin()"
  return (
    <div>
      {userDetail?.user ? <div>
        <NavLink to="/">Jobly</NavLink>
        <NavLink to="/companies">Companies</NavLink>
        <NavLink to="/jobs">Jobs</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/" onClick={logout}>Logout {userDetail.user.username}</NavLink>
      </div> : <div>
      <NavLink to="/">Jobly</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/signup">Signup</NavLink>
      </div>}
    </div>
  );
}
