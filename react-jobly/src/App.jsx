import { React, useState, Route, Routes, useEffect } from "react";
import { BrowserRouter, Navigate } from "react-router-dom";
import RoutesList from "./RoutesList.jsx";
import Navbar from "./Navbar.jsx";
import userContext from "./userContext.js";
import JoblyApi from "../../api.js";
import {jwtDecode} from "jwt-decode";

/** Component for entire Jobly app.
 *
 * Props: none
 * State: user
 *
 * App -> Navbar / RoutesList
 */

function App() {
  const [userDetail, setUserDetail] = useState({});
  const [token, setToken] = useState();
  const [isLoading, setIsLoading] = useState(false);

  console.log("app renders:", token, "token", userDetail, "userDetail");

  /** Calls api to return token on user login. */
  
  async function login(username, password) {
    setIsLoading(true);
    let userFromAPI;

    try {
      userFromAPI = await JoblyApi.login(username, password); //returns token
      JoblyApi.token = userFromAPI;
      setToken(userFromAPI);
      setIsLoading(false);
    } catch (err) {
      setUserDetail({ error: err[0] });
    }
  }

  function logout() {
    setToken({});
    <Navigate to="/" />;
  }

  /** Calls api to return token on new user signup. */
  async function signup({ username, password, firstName, lastName, email }) {
    setIsLoading(true);
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
      setIsLoading(false);
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
        console.log("useEffect running in App");
        setIsLoading(true);
        if (token) {
          let decodedToken = jwtDecode(token)
          let username = decodedToken.username
          username = decodedToken.username;
          console.log("made here");
          console.log(username, "username");
          try {
            let userInfo = await JoblyApi.getUserDetail(username);
            console.log(userInfo, "userinfo inside useEffect");
            setUserDetail(userInfo);
            setIsLoading(false);
          } catch (err) {
            setIsLoading(false);
            setUserDetail({ error: err[0] });
          }
        } else {
          setIsLoading(false);
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
        {isLoading ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : (
          <userContext.Provider value={{ userDetail }}>
            <BrowserRouter>
              <Navbar logout={userFunctions.logout} />
              <RoutesList userFunctions={userFunctions} />
            </BrowserRouter>
          </userContext.Provider>
        )}
      </main>
    </div>
  );
}

export default App;
