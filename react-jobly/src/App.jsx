import React from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesList from "./RoutesList.jsx";
import Navbar from "./Navbar.jsx";

/** Component for entire Jobly app.
 *
 * Props: none
 * State: none
 *
 */

function App() {
  return (
    <div className="App">
      <main>
        <BrowserRouter>
          <Navbar />
          <RoutesList />
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
