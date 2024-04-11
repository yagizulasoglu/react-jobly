import { useState, React, useContext } from "react";
import userContext from "./userContext";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert.jsx";

/**
 * Renders Login.
 *
 * State:
 * formData
 *
 * Props:
 * handleSave
 *
 * App -> RoutesList -> Login
 */

export default function Login({ handleSave }) {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const { userDetail } = useContext(userContext);

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  //redirect if successful***
  function handleSubmit(evt) {
    evt.preventDefault();
    handleSave(formData.Username, formData.password);
    setFormData({ username: "", password: "" });
  }
 

  console.log(userDetail, "userDetail in login comp");
  if (userDetail?.username) {
    navigate("/");
  }

  return (
    <form className="Login-form" onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          id="newLogin-form-name"
          name="Username"
          className="form-control"
          placeholder="Username"
          onChange={handleChange}
          value={formData.username}
          aria-label="Username"
          required
        />
      </div>
      <div className="mb-3">
        <textarea
          id="newLogin-form-password"
          name="password"
          className="form-control"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          aria-label="Password"
        />
      </div>
      {userDetail.error && <Alert error={userDetail.error} />}
      <button className="btn-primary rig btn btn-sm newLogin-form-addBtn">
        Login
      </button>
    </form>
  );
}
