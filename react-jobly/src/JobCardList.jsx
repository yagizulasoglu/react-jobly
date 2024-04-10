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
 *
 * App -> RoutesList -> JobsList -> JobCardList
 */

function JobCardList({ jobsList = [] }) {
  return (
    <div className="JobCardList">
      {jobsList.map((job) => (
        <div key={job.id}>
          <JobCard jobData={job} />{" "}
        </div>
      ))}
    </div>
  );
}

export default JobCardList;
