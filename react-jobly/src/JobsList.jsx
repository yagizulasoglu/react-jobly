import { useState, React, useEffect } from "react";
import JobCardList from "./JobCardList";
import SearchForm from "./SearchForm";
import JoblyApi from "../../api";
import "./Jobs.css";

/**
 * Renders list of jobs.
 *
 * State:
 *  jobslist (api)
 *  titleAndLoading: {title, loading}
 *
 * Props:
 * none
 *
 *
 * App -> RoutesList -> JobsList
 */

function JobsList() {
  const [jobsList, setJobsList] = useState([]);
  const [titleAndLoading, setTitleAndLoading] = useState({ title: "All jobs", loading: true });

  /** Calls API to display all jobs. */
  useEffect(function fetchJobs() {
    setTitleAndLoading({ ...titleAndLoading, loading: true });
    async function fetchAllJobs() {
      const jobs = await JoblyApi.getAllJobs();
      setJobsList(jobs);
      setTitleAndLoading({ ...titleAndLoading, loading: false });
    }
    fetchAllJobs();
  }, []);

  async function search(word) {
    setTitleAndLoading({ ...titleAndLoading, loading: true });
    let userWord = word.trim();
    const searched = await JoblyApi.searchJobs(userWord);
    setJobsList(searched);
    if (userWord === "") {
      setTitleAndLoading({ title: "All jobs", loading: false });
    } else if (searched.length === 0) {
      setTitleAndLoading({ title: `Search results for "${userWord}" - Sorry, no results were found!`, loading: false });
    } else {
      setTitleAndLoading({ title: `Search results for "${userWord}"`, loading: false });
    }
  }

  return (
    <div className="JobsList">
      {titleAndLoading.loading ? <p>Loading...</p> :
        <div>
          <SearchForm handleSearch={search} className="JobsList-Search" />
          <h1 className="JobsList-title">{titleAndLoading.title}</h1>
          <JobCardList jobsList={jobsList} />
        </div>}
    </div>
  );
}

export default JobsList;
