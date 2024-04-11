import {React, useContext} from "react"
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

export default function Homepage(){
    const { userDetail } = useContext(userContext);

    return (
        <main className="Homepage">
            <div>
                {userDetail?.firstName ? <div className="Homepage-User">
                    <h1>Welcome {userDetail.firstName}</h1>
                    </div> :
                    <div className="Homepage-Anon">
                    <h1>Jobly!</h1>
                    <h3>All the jobs in one, convenient place.</h3>
                    <button><Link to="/login">Login</Link></button>
                    <button><Link to="/signup">Sign Up</Link></button>
                </div>}
            </div>
        </main>
    )
}