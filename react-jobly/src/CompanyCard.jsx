import React from "react";
import { Link } from "react-router-dom";

/**
 * State:
 *
 *
 * Props:
 * company
 *
 * App -> RoutesList -> CompaniesList -> CompanyCard
 */

export default function CompanyCard({ company }) {
  return (
    <div className="CompanyCard">
      <Link to={`/companies/${company.handle}`}>
        <h4>{company.handle}</h4>
        <p>{company.description}</p>
      </Link>
    </div>
  );
}
