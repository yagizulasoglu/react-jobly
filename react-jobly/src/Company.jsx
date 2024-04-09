import { useState } from "react";
import JobCardList from "./JobCardList";
import { Link } from "react-router-dom";

/**
 * State:
 *  companyData like {}
*
* Props:
 *
 */

function Company() {
    const [companyData, setCompanyData] = useState({});

  return(
    <div className="Company">
    <h1>Company</h1>
    <JobCardList/>
    </div>
  )
}

export default Company;