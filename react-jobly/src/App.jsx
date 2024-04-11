import { React, useState, Route, Routes } from "react";
import { BrowserRouter, Navigate, useNavigate } from "react-router-dom";
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
    const userFromAPI = await JoblyApi.login(username, password);
    setUserAndToken(userFromAPI);
  }


  /** Calls api to return token on new user signup. */
  async function signup({username, password, firstName, lastName, email}) {
    const newUserFromAPI = await JoblyApi.signup(
      username,
      password,
      firstName,
      lastName,
      email
    );
    setUserAndToken({...userAndToken, token: newUserFromAPI});
    if(newUserFromAPI) {
      return <Navigate to="/" />;
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

  const userFunctions = {
    login: login,
    signup: signup,
    profile: profile,
  }

  return (
    <div className="App">
      <main>
        <userContext.Provider value={{ userAndToken: null }}>
          <BrowserRouter>
            <Navbar />
            <RoutesList userFunctions={userFunctions}/>
          </BrowserRouter>
        </userContext.Provider>
      </main>
    </div>
  );
}

export default App;
