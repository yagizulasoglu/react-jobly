import React from "react";

/**
 * Renders Signup.
 *
 * State:
 * formData
 *
 * Props:
 * handleSave
 *
 * App -> RoutesList -> Signup
 */

export default function Signup({ handleSave }) {
  const [formData, setFormData] = useState({});

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  //if successful--redirect them to the homepage**
  function handleSubmit(evt) {
    evt.preventDefault();
    handleSave(formData);
    setFormData({});
  }

  return (
    <form className="Profile-form" onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          id="newSignup-form-name"
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
          id="newSignup-form-password"
          name="password"
          className="form-control"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          aria-label="password"
        />
      </div>
      <div className="mb-3">
        <textarea
          id="newSignup-form-firstname"
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
          id="newSignup-form-lastname"
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
          id="newSignup-form-email"
          name="email"
          className="form-control"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          aria-label="email"
        />
      </div>
      <button className="btn-primary rig btn btn-sm newSignup-form-addBtn">
        Submit
      </button>
    </form>
  );
}
