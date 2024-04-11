import { React, useState, Route, Routes } from "react";
import { BrowserRouter } from "react-router-dom";
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
  const [userAndToken, setUserAndToken] = useState({});

  /** Calls api to return token on user login. */
  async function login(username, password) {
    let userFromAPI;
    try {
      userFromAPI = await JoblyApi.login(username, password);
      setUserAndToken({ ...userFromAPI, username: username });
    } catch (err) {
      setUserAndToken({ ...userAndToken, error: err[0] });
    }
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
      setUserAndToken({ ...userAndToken, token: newUserFromAPI });
    } catch (err) {
      setUserAndToken({ ...userAndToken, error: err[0] });
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
            userAndToken.username,
            userAndToken.token
          );
          setUserAndToken({ ...userAndToken, userDetail });
        } catch (err) {
          setUserAndToken({ ...userAndToken, error: err[0] });
        }
      }
      fetchUserDetail();
    },
    [userAndToken]
  );

  const userFunctions = {
    login: login,
    signup: signup,
    profile: profile,
  };

  return (
    <div className="App">
      <main>
        <userContext.Provider value={{ userAndToken }}>
          <BrowserRouter>
            <Navbar />
            <RoutesList userFunctions={userFunctions} />
          </BrowserRouter>
        </userContext.Provider>
      </main>
    </div>
  );
}

export default App;
