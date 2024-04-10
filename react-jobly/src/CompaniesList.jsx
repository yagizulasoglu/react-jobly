import { useEffect, useState } from "react";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";
import JoblyApi from "../../api";

/**
 * State:
 *  companiesList
 *
 * Props:
 *
 * App -> RoutesList -> CompaniesList
 */

function CompaniesList() {
  const [companiesList, setCompaniesList] = useState([]);

  useEffect(function fetchAllCompanies() {
    async function fetchCompanies() {
      const companiesArray = await JoblyApi.getAllCompanies();
      setCompaniesList(companiesArray);
    }
    fetchCompanies();
    console.log(companiesList);
  }, [])
//TODO: Look at api.js!!
  async function search(word) {
    const searched = await JoblyApi.searchCompany(word);
    setCompaniesList(searched);
    console.log(searched);
  }

  return (
    <div className="CompaniesList">
      <h1>Companies</h1>
      <SearchForm handleSearch={search}/>
      <ul>
      {companiesList.map(company => (
        <li key={company.handle}>
          <CompanyCard company={company}/>
        </li>))}
      </ul>
    </div>
  );
}

export default CompaniesList;
