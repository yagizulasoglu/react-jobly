import React from "react";
import { Link } from "react-router-dom";
import "./Companies.css";

/**
 * State:
 *  none
 *
 * Props:
 * company
 *
 * App -> RoutesList -> CompaniesList -> CompanyCard
 */

export default function CompanyCard({ company }) {
  return (
    <div className="CompanyCard">
      <Link className="CompanyCard-link" to={`/companies/${company.handle}`}>
        <h4>{company.handle}</h4>
        <p>{company.description}</p>
      </Link>
    </div>
  );
}
