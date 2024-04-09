import { React } from "react";
import JobCard from "./JobCard";

/**
 * Renders list of jobs.
 *
 * State:
 *  none
 *
 * Props:
 *  jobsList
 */

function JobCardList({ jobsList = "" }) {
  return (
    <div className="JobCardList">
      <h1>jobs</h1>
      <JobCard />
      <JobCard />
      <JobCard />
      <JobCard />
    </div>
  );
}

export default JobCardList;
