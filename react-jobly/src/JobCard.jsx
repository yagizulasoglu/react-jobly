import { useState, React } from "react";
import convertAndFormat from "../../convertAndFormat";

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
      <h1>{jobData.title}</h1>
      <h3>{jobData.companyHandle}</h3>
      <h2>${convertAndFormat(jobData.salary)}</h2>
      <h2>Equity: {jobData.equity}</h2>
    </div>
  );
}

export default JobCard;
