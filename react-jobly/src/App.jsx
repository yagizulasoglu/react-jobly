import { React, useState } from "react";
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
  async function login({ username, password }) {
    const userFromAPI = await JoblyApi.login(username, password);
    setUserAndToken(userFromAPI);
  }

  /** Calls api to return token on new user signup. */
  async function signup({ username, password, firstname, lastname, email }) {
    const newUserFromAPI = await JoblyApi.signup(
      username,
      password,
      firstname,
      lastname,
      email
    );
    setUserAndToken(newUserFromAPI);
  }

  /** Calls api to retrieve user information and returns updated user info. */
  async function profile({ username, firstname, lastname, email }) {
    const userProfileFromAPI = await JoblyApi.editProfile(
      username,
      firstname,
      lastname,
      email
    );
    setUserAndToken(userProfileFromAPI);
  }

  return (
    <div className="App">
      <main>
        <userContext.Provider value={{ userAndToken: null }}>
          <BrowserRouter>
            <Navbar />
            <RoutesList />
          </BrowserRouter>
        </userContext.Provider>
      </main>
    </div>
  );
}

export default App;
