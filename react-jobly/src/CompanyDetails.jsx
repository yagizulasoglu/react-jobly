import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JobCardList from "./JobCardList";
import JoblyApi from "../../api";
import "./Companies.css";

/**
 * State:
 *  companyData: {}
 *  errors: []
 * loading: boolean
*
* Props:
 *
 *
 * App -> RoutesList -> CompanyDetail
 */


function CompanyDetails() {
  const [companyData, setCompanyData] = useState({});
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const { handle } = useParams();


  useEffect(function fetchNewCompany() {
    setLoading(true);
    async function fetchCompany() {
      try {
        const companyInfo = await JoblyApi.getCompany(handle);
        setCompanyData(companyInfo);
        setLoading(false);
      } catch (err) {
        setErrors([err]);
        setLoading(false);
      }
    }
    fetchCompany();
  }, []);


  return (
    <div className="Company">
      {loading ? <p>Loading...</p> : <div>
        {errors.length > 0 ? <h1>{errors[0]}</h1> : <div> <h3>{companyData.name}</h3>
          <p>{companyData.description}</p>
          <JobCardList jobsList={companyData.jobs} /> </div>}
      </div>}
    </div>
  );
}

export default CompanyDetails;