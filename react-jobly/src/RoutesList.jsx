import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CompaniesList from "./CompaniesList.jsx";
import CompanyDetails from "./CompanyDetails.jsx";
import JobsList from "./JobsList.jsx";
import Homepage from "./Homepage.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Profile from "./Profile.jsx";

/** All routes for Jobly app.
 *
 * Props:
 * none
 *
 * States:
 * none
 *
 * App -> RoutesList
 */

export default function RoutesList({userFunctions}) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/companies" element={<CompaniesList />} />
        <Route path="/companies/:handle" element={<CompanyDetails />} />
        <Route path="/jobs" element={<JobsList />} />
        <Route path="/login" element={<Login handleSave={userFunctions.login}/>} />
        <Route path="/signup" element={<Signup handleSave={userFunctions.signup}/>} />
        <Route path="/profile" element={<Profile handleSave={userFunctions.profile}/>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
