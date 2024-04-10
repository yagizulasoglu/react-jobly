import { useState, React, useEffect } from "react";
import JobCardList from "./JobCardList";
import SearchForm from "./SearchForm";
import JoblyApi from "../../api";

/**
 * Renders list of jobs.
 *
 * State:
 *  jobslist (api)
 *
 * Props:
 * none
 *
 *
 * App -> RoutesList -> JobsList
 */

function JobsList() {
  const [jobsList, setJobsList] = useState([]);
  const [stage, setStage] = useState("All jobs");

  /** Calls API to display all jobs. */
  useEffect(() => {
    async function fetchAllJobs() {
      const jobs = await JoblyApi.getAllJobs();
      setJobsList(jobs);
    }
    fetchAllJobs();
  }, []);

  async function search(word) {
    let userWord = word.trim();
    const searched = await JoblyApi.searchJobs(userWord);
    setJobsList(searched);
    if (userWord === "") {
      setStage("All jobs");
    } else if (search.length === 0) {
      setStage(`Search results for "${userWord}"
        Sorry, no results were found!`);
    } else {
      setStage(`Search results for "${userWord}"`);
    }
  }

  return (
    <div className="JobsList">
      <SearchForm handleSearch={search} />
      <h1>{stage}</h1>
      <JobCardList jobsList={jobsList} />
    </div>
  );
}

export default JobsList;
