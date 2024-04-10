import { useState, React } from "react";
import JobCardList from "./JobCardList";
import SearchForm from "./SearchForm";

/**
 * Renders list of jobs.
 *
 * State:
 *  jobslist (api)
 *
 * Props:
 *
 *
 * App -> RoutesList -> JobsList
 */

function JobsList() {
  const [jobsList, setJobsList] = useState([]);

  return (
    <div className="JobsList">
      <SearchForm />
      <h1>jobs</h1>
        <JobCardList />
    </div>
  );
}

export default JobsList;
