import { useEffect, useState } from "react";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";
import JoblyApi from "../../api";
import "./Companies.css";

/**
 * State:
 *  companiesList
 *  titleAndLoading: {title, loading}
 *
 * Props:
 * none
 *
 * App -> RoutesList -> CompaniesList
 */

function CompaniesList() {
  const [companiesList, setCompaniesList] = useState([]);
  const [titleAndLoading, setTitleAndLoading] = useState({ title: "All companies", loading: true });

  /** Calls API to display all companies. */
  useEffect(function fetchAllCompanies() {
    setTitleAndLoading({ ...titleAndLoading, loading: true });
    async function fetchCompanies() {
      const companies = await JoblyApi.getAllCompanies();
      setCompaniesList(companies);
      setTitleAndLoading({ ...titleAndLoading, loading: false });
    }
    fetchCompanies();
  }, []);

  async function search(word) {
    setTitleAndLoading({ ...titleAndLoading, loading: true });
    let userWord = word.trim();
    const searched = await JoblyApi.searchCompany(userWord);
    setCompaniesList(searched);
    if (userWord === "") {
      setTitleAndLoading({ title: "All companies", loading: false });
    } else if (searched.length === 0) {
      setTitleAndLoading({ title: `Search results for "${userWord}" - Sorry, no results were found!`, loading: false });
    } else {
      setTitleAndLoading({ title: `Search results for "${userWord}"`, loading: false });
    }
  }

  return (
    <div className="CompaniesList">
      {titleAndLoading.loading ? <p>Loading...</p> : <div>
        <SearchForm handleSearch={search} />
        <h1 className="CompaniesList-title">{titleAndLoading.title}</h1>
        <ul>
          {companiesList.map((company) => (
            <p key={company.handle}>
              <CompanyCard company={company} />
            </p>
          ))}
        </ul>
      </div>}
    </div>
  );
}

export default CompaniesList;
