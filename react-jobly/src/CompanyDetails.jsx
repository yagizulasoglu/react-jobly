import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JobCardList from "./JobCardList";
import JoblyApi from "../../api";

/**
 * State:
 *  companyData like {}
*
* Props:
 *
 *
 * App -> RoutesList -> CompanyDetail
 */

function Company() {
    const [companyData, setCompanyData] = useState({});

    const {handle} = useParams();


    useEffect(function fetchNewCompany() {
      async function fetchCompany() {
        const companyInfo = await JoblyApi.getCompany(handle);
        setCompanyData(companyInfo);
      }
      fetchCompany();
    }, [])

  return(
    <div className="Company">
    <h3>{companyData.name}</h3>
    <p>{companyData.description}</p>
    <JobCardList jobsList={companyData.jobs}/>
    </div>
  )
}

export default Company;