import {React, useContext} from "react"
import { Routes, Route, Navigate } from "react-router-dom";
import userContext from "./userContext";
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
  const { userAndToken } = useContext(userContext);

  return (
    <div>
        {userAndToken?.token ?
      <Routes>
          <Route path="/companies" element={<CompaniesList />} />
          <Route path="/companies/:handle" element={<CompanyDetails />} />
          <Route path="/jobs" element={<JobsList />} />
          <Route path="/profile" element={<Profile handleSave={userFunctions.profile}/>} />
          <Route path="/logout" element={<Navigate to="/" />} />
          <Route path="/" element={<Homepage />} />
        <Route path="*" element={<Navigate to="/" />} />
        </Routes>
         :<Routes>
          <Route path="/login" element={<Login handleSave={userFunctions.login}/>} />
          <Route path="/signup" element={<Signup handleSave={userFunctions.signup}/>} />
          <Route path="/" element={<Homepage />} />
          <Route path="*" element={<Navigate to="/" />} />
          </Routes>}
    </div>
  );
}
