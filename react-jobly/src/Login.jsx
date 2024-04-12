import { useState, React, useContext } from "react";
import userContext from "./userContext";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert.jsx";
import "./Login.css";

/**
 * Renders Login.
 *
 * State:
 * formData
 * errors
 *
 * Props:
 * handleSave
 *
 * App -> RoutesList -> Login
 */

export default function Login({ handleSave }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState([]);
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
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await handleSave(formData.username, formData.password);
      setFormData({ username: "", password: "" });
      navigate("/");
    } catch (err) {
      setErrors(err);
    }
  }

  return (
    <div className="Login-form-container">
    <form className="Login-form" onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          id="newLogin-form-name"
          name="username"
          className="form-control"
          placeholder="Username"
          onChange={handleChange}
          value={formData.username}
          aria-label="Username"
          required
        />
      </div>
      <div className="mb-3">
        <input
          id="newLogin-form-password"
          name="password"
          className="form-control"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          aria-label="Password"
          type="password"
        />
      </div>
      {errors.length > 0 &&
        errors.map((error, i) => (
          <div key={i}>
            <Alert message={error} color='red' />
          </div>
        ))}
      <button className="btn-primary rig btn btn-sm newLogin-form-addBtn">
        Login
      </button>
    </form>
    </div>
  );
}
