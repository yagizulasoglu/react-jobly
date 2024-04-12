import { useState, React } from "react";
import convertAndFormat from "../../convertAndFormat";
import "./Jobs.css";

/**
 * Renders JobCard.
 *
 * State:
 *  none
 *
 * Props:
 * jobData
 *
 *
 * App -> RoutesList -> JobsList -> JobCardList -> JobCard
 */

function JobCard({ jobData = {} }) {
  return (
    <div className="JobCard">
      <h3>{jobData.title}</h3>
      <h4>{jobData.companyHandle}</h4>
      <h5>${convertAndFormat(jobData.salary)}</h5>
      <h5>Equity: {jobData.equity}</h5>
    </div>
  );
}

export default JobCard;
