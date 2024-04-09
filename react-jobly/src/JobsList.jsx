import { useState, React } from "react";
import JobCardList from "./JobCardList";

/**
 * Renders list of jobs.
 *
 * State:
 *  jobslist (api)
 *
 * Props:
 *
 */

function JobsList() {
  const [jobsList, setJobsList] = useState([]);

  return (
    <div className="JobsList">
      <h1>jobs</h1>
        <JobCardList />
    </div>
  );
}

export default JobsList;
