import React from "react";
import { NavLink } from "react-router-dom";

/*
 *  Renders the Navbar
 *  State:
 *  none
 *
 *
 * Props:
 *  none
 *
 *
 * App -> Navbar
 */

export default function Navbar() {
  return (
    <div>
      <NavLink to="/">Jobly</NavLink>
      <NavLink to="/companies">Companies</NavLink>
      <NavLink to="/jobs">Jobs</NavLink>
    </div>
  );
}
