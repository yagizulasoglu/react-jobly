import { useState, React, useContext } from "react";
import userContext from "./userContext";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
import "./Profile.css";
/**
 * Renders Profile.
 *
 * State:
 * formData
 *
 * Props:
 * handleSave
 *
 * App -> RoutesList -> Profile
 */

export default function Profile({ handleSave }) {
  const [toggleAlert, setToggleAlert] = useState({
    message: null,
    color: null,
  });

  const { userDetail } = useContext(userContext);
  const [formData, setFormData] = useState({
    username: userDetail.user.username,
    firstname: userDetail.user.firstName,
    lastname: userDetail.user.lastName,
    email: userDetail.user.email,
  });

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await handleSave(formData);
      setToggleAlert({ message: ["Success!"], color: "green" });
    } catch (err) {
      setToggleAlert({ message: err, color: "red" });
    }
  }

  return (
    <form className="Profile-form" onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          id="newProfile-form-name"
          name="Username"
          className="form-control"
          placeholder="Username"
          onChange={handleChange}
          value={formData.username}
          aria-label="Username"
          disabled
        />
      </div>
      <div className="mb-3">
        <textarea
          id="newProfile-form-firstname"
          name="firstname"
          className="form-control"
          placeholder="Firstname"
          onChange={handleChange}
          value={formData.firstname}
          aria-label="firstname"
        />
      </div>
      <div className="mb-3">
        <textarea
          id="newProfile-form-lastname"
          name="lastname"
          className="form-control"
          placeholder="Lastname"
          onChange={handleChange}
          value={formData.lastname}
          aria-label="lastname"
        />
      </div>
      <div className="mb-3">
        <textarea
          id="newProfile-form-email"
          name="email"
          className="form-control"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          aria-label="email"
        />
      </div>

      {toggleAlert.message !== null &&
        toggleAlert.message.map((err, i) => (
          <div key={i}>
            <Alert color={toggleAlert.color} message={err} />{" "}
          </div>
        ))}
      <button className="btn-primary rig btn btn-sm newProfile-form-addBtn">
        Save Changes
      </button>
    </form>
  );
}
