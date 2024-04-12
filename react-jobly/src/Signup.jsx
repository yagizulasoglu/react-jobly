import { useState, React, useContext } from "react";
import userContext from "./userContext";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert.jsx";
import "./Signup.css";

/**
 * Renders Signup.
 *
 * State:
 * formData
 * errors
 *
 * Props:
 * handleSave
 *
 * App -> RoutesList -> Signup
 */

export default function Signup({ handleSave }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [errors, setErrors] = useState([]);
  const { userDetail } = useContext(userContext);
  const navigate = useNavigate();

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  //if successful--redirect them to the homepage**
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await handleSave(formData);
      setFormData({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
      });
      navigate("/");
    } catch (err) {
      setErrors(err);
    }
  }

  return (
    <form className="Profile-form" onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          id="newSignup-form-name"
          name="username"
          className="form-control"
          placeholder="Username"
          onChange={handleChange}
          value={formData.username}
          aria-label="username"
          required
        />
      </div>
      <div className="mb-3">
        <input
          id="newSignup-form-password"
          name="password"
          className="form-control"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          aria-label="password"
          type="password"
        />
      </div>
      <div className="mb-3">
        <input
          id="newSignup-form-firstname"
          name="firstName"
          className="form-control"
          placeholder="First name"
          onChange={handleChange}
          value={formData.firstName}
          aria-label="firstName"
        />
      </div>
      <div className="mb-3">
        <input
          id="newSignup-form-lastname"
          name="lastName"
          className="form-control"
          placeholder="Last name"
          onChange={handleChange}
          value={formData.lastName}
          aria-label="lastName"
        />
      </div>
      <div className="mb-3">
        <input
          id="newSignup-form-email"
          name="email"
          className="form-control"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          aria-label="email"
        />
      </div>
      {errors.length > 0 &&
        errors.map((error, i) => (
          <div key={i}>
            <Alert message={error} color="red" />
          </div>
        ))}
      <button className="btn-primary rig btn btn-sm newSignup-form-addBtn">
        Submit
      </button>
    </form>
  );
}
