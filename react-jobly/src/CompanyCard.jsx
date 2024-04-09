import React from "react";
import { Link } from "react-router-dom";

/**
 * State:
 *
 *
 * Props:
 * companiesList
 */

export default function CompanyCard({ companiesList }) {
  return (
    <div className="CompanyCard">
      <Link to="/companies/:handle">
        <h1>Company info..</h1>
      </Link>
    </div>
  );
}
