import { useState } from "react";
import Company from "./Company";
import CompanyCard from "./CompanyCard";

/**
 * State:
 *  companiesList
 *
 * Props:
 *
 */

function CompaniesList() {
  const [companiesList, setCompaniesList] = useState([]);

  return (
    <div className="CompaniesList">
      <h1>Companies</h1>
      <CompanyCard />
      <CompanyCard />
      <CompanyCard />
    </div>
  );
}

export default CompaniesList;
