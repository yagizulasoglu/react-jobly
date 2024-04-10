import React from "react";

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
  const [formData, setFormData] = useState({});

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  //on success-- show alert after, not redirect
  function handleSubmit(evt) {
    evt.preventDefault();
    handleSave(formData);
    setFormData({});
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
          required
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
      <button className="btn-primary rig btn btn-sm newProfile-form-addBtn">
        Save Changes
      </button>
    </form>
  );
}
