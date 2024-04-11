import { React, useState, Route, Routes, useEffect } from "react";
import { BrowserRouter, Navigate } from "react-router-dom";
import RoutesList from "./RoutesList.jsx";
import Navbar from "./Navbar.jsx";
import userContext from "./userContext.js";
import JoblyApi from "../../api.js";

/** Component for entire Jobly app.
 *
 * Props: none
 * State: user
 *
 * App -> Navbar / RoutesList
 */

function App() {
  const [userDetail, setUserDetail] = useState({});
  const [token, setToken] = useState()

  /** Calls api to return token on user login. */
  async function login(username, password) {
    let userFromAPI;
    try {
      userFromAPI = await JoblyApi.login(username, password);
      setUserDetail({username: username})
      JoblyApi.token = userFromAPI;
      setToken(userFromAPI);
    } catch (err) {
      setUserDetail({ error: err[0] });
    }
  }

  function logout() {
    setUserAndToken({});
    <Navigate to="/" />
  }

  /** Calls api to return token on new user signup. */
  async function signup({ username, password, firstName, lastName, email }) {
    let newUserFromAPI;
    try {
      newUserFromAPI = await JoblyApi.signup(
        username,
        password,
        firstName,
        lastName,
        email
      );
      setUserDetail(newUserFromAPI.userDetail);
      setToken(newUserFromAPI.token);
    } catch (err) {
      setUserDetail({ error: err[0] });
    }
  }

  /** Calls api to retrieve user information and returns updated user info. */
  async function profile(username, firstName, lastName, email) {
    const userProfileFromAPI = await JoblyApi.editProfile(
      username,
      firstName,
      lastName,
      email
    );
    setUserAndToken(userProfileFromAPI);
  }

  /** Fetch user detail every time a change in user and token is detected. */
  useEffect(
    function fetchUserFullDetail() {
      async function fetchUserDetail() {
        let userDetail;
        try {
          userDetail = await Jobly.getUserDetail(
            userDetail.username,
          );
          setUserDetail(userDetail);
          console.log("userDetail in useEffect", userDetail);
        } catch (err) {
          setUserDetail({ error: err[0] });
        }
      }
      fetchUserDetail();
    },
    [token]
  );

  const userFunctions = {
    login: login,
    signup: signup,
    profile: profile,
    logout: logout,
  };

  return (
    <div className="App">
      <main>
        <userContext.Provider value={{ userDetail }}>
          <BrowserRouter>
            <Navbar logout={userFunctions.logout}/>
            <RoutesList userFunctions={userFunctions} />
          </BrowserRouter>
        </userContext.Provider>
      </main>
    </div>
  );
}

export default App;
