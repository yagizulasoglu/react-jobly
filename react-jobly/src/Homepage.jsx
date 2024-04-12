import { React, useContext } from "react";
import userContext from "./userContext";
import { Link } from "react-router-dom";

/**
 * Renders homepage.
 *
 * State:
 * none
 *
 * Props:
 * none
 *
 * App -> RoutesList -> Homepage
 */

export default function Homepage() {
    const { userDetail } = useContext(userContext);

    function loggedInView() {
        return (
            <div className="Homepage-User">
                <h1>Welcome {userDetail.user.firstName}</h1>
            </div>
        );
    }

    function loggedOutView() {
        return (
            <div className="Homepage-Anon">
                <h1>Jobly!</h1>
                <h3>All the jobs in one, convenient place.</h3>
                <button><Link to="/login">Login</Link></button>
                <button><Link to="/signup">Sign Up</Link></button>
            </div>
        );
    }


    return (
        <main className="Homepage">
            <div>
                {userDetail ? loggedInView() : loggedOutView()}
            </div>
        </main>
    );
}