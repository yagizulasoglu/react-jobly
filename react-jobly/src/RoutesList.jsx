import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CompaniesList from "./CompaniesList.jsx";
import Company from "./Company.jsx";
import JobsList from "./JobsList.jsx";
import Homepage from "./Homepage.jsx";

/** All routes for Jobly app. */

export default function RoutesList() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/companies" element={<CompaniesList />} />
        <Route path="/companies/:handle" element={<Company />} />
        <Route path="/jobs" element={<JobsList />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
