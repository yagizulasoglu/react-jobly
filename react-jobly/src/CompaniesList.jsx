import { useEffect, useState } from "react";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";
import JoblyApi from "../../api";

/**
 * State:
 *  companiesList
 *
 * Props:
 * none
 *
 * App -> RoutesList -> CompaniesList
 */

function CompaniesList() {
  const [companiesList, setCompaniesList] = useState([]);
  const [stage, setStage] = useState("All companies");

  /** Calls API to display all companies. */
  useEffect(function fetchAllCompanies() {
    async function fetchCompanies() {
      const companiesArray = await JoblyApi.getAllCompanies();
      setCompaniesList(companiesArray);
    }
    fetchCompanies();
  }, []);

  async function search(word) {
    let userWord = word.trim();
    const searched = await JoblyApi.searchCompany(userWord);
    setCompaniesList(searched);
    if (userWord === "") {
      setStage("All companies");
    } else if (search.length === 0) {
      setStage(`Search results for "${userWord}"
      Sorry, no results were found!`);
    } else {
      setStage(`Search results for "${userWord}"`);
    }
  }

  return (
    <div className="CompaniesList">
      <SearchForm handleSearch={search} />
      <h1>{stage}</h1>
      <ul>
        {companiesList.map((company) => (
          <li key={company.handle}>
            <CompanyCard company={company} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CompaniesList;
