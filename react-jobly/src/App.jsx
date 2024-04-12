import { React, useState, Route, Routes, useEffect } from "react";
import { BrowserRouter, Navigate } from "react-router-dom";
import RoutesList from "./RoutesList.jsx";
import Navbar from "./Navbar.jsx";
import userContext from "./userContext.js";
import JoblyApi from "../../api.js";
import { jwtDecode } from "jwt-decode";
import "./App.css";

/** Component for entire Jobly app.
 *
 * Props: none
 * State: userDetail, token, loading
 *
 * App -> Navbar / RoutesList
 */

function App() {
  const [userDetail, setUserDetail] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);

  /** Fetch user detail every time a change in user and token is detected. */
  useEffect(
    function fetchUserFullDetail() {
      async function fetchUserDetail() {
        setIsLoading(true);
        if (token) {
          JoblyApi.token = token;
          let decodedToken = jwtDecode(token);
          let username = decodedToken.username;
          try {
            let userInfo = await JoblyApi.getUserDetail(username);
            setUserDetail(userInfo);
          } catch (err) {
            console.log(err);
          } finally {
            setIsLoading(false);
          }
        } else {
          setUserDetail(null);
          setIsLoading(false);
        }
      }
      fetchUserDetail();
    },
    [token]
  );
  console.log("app renders:", token, "token", userDetail, "userDetail");

  /** Calls api to return token on user login. */

  async function login(username, password) {
    setIsLoading(false);
    const tokenFromAPI = await JoblyApi.login(username, password); //returns token
    localStorage.setItem("token", tokenFromAPI);
    setToken(tokenFromAPI);
  }

  function logout() {
    localStorage.clear();
    setToken("");
  }

  /** Calls api to return token on new user signup. */
  async function signup({ username, password, firstName, lastName, email }) {
    setIsLoading(false);
    let newUserFromAPI;
    newUserFromAPI = await JoblyApi.signup(
      username,
      password,
      firstName,
      lastName,
      email
    );
    localStorage.setItem("token", newUserFromAPI.token);
    setToken(newUserFromAPI.token);
  }

  /** Calls api to retrieve user information and returns updated user info. */
  async function profile(formData) {
    setIsLoading(false);
    const userProfileFromAPI = await JoblyApi.editProfile(
      formData.username,
      formData.firstname,
      formData.lastname,
      formData.email
    );

    setUserDetail(userProfileFromAPI);
  }

  const userFunctions = {
    login: login,
    signup: signup,
    profile: profile,
    logout: logout,
  };

  return (
    <div className="App">
      <main>
        {isLoading ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : (
          <userContext.Provider value={{ userDetail }}>
            <BrowserRouter className="Browser">
              <Navbar className="Navbar" logout={userFunctions.logout} />
              <RoutesList userFunctions={userFunctions} />
            </BrowserRouter>
          </userContext.Provider>
        )}
        <div className="background-container"></div>
      </main>
    </div>
  );
}

export default App;
