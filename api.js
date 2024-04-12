const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN
  // static token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  //   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  //   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";
  static token;

  static async request(endpoint, data = {}, method = "GET") {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    const headers = {
      authorization: `Bearer ${JoblyApi.token}`,
      'content-type': 'application/json',
    };

    url.search = (method === "GET")
      ? new URLSearchParams(data).toString()
      : "";

    // set to undefined since the body property cannot exist on a GET method
    const body = (method !== "GET")
      ? JSON.stringify(data)
      : undefined;

    const resp = await fetch(url, { method, body, headers });

    if (!resp.ok) {
      console.error("API Error:", resp.statusText, resp.status);
      const message = (await resp.json()).error.message;
      throw Array.isArray(message) ? message : [message];
    }

    return await resp.json();
  }

  // Individual API routes

  // COMPANIES

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async searchCompany(queryParam) {
    queryParam = queryParam.trim();
    let searchTerm = {};
    if (queryParam) {
      searchTerm = { nameLike: `${queryParam}` };
    }
    let res = await this.request(`companies`, searchTerm);
    return res.companies;
  }

  /** Get all companies. */

  static async getAllCompanies() {
    let res = await this.request('companies/');
    return res.companies;
  }

  //JOBS

  /** Get all jobs. */

  static async getAllJobs() {
    let res = await this.request('jobs/');
    return res.jobs;
  }


  /** Search by job title. */

  static async searchJobs(queryParam) {
    queryParam = queryParam.trim();
    let searchTerm = {};
    if (queryParam) {
      searchTerm = { title: `${queryParam}` };
    }
    let res = await this.request("jobs", searchTerm);
    return res.jobs;
  }


  /** Login user. */

  static async login(username, password) {
    let userInfo = { username, password };
    let res = await this.request("auth/token", userInfo, "POST");
    return res.token;
  }

  /** Signup new user. */

  static async signup(username, password, firstName, lastName, email) {
    let newUserInfo = { username, password, firstName, lastName, email };
    let res = await this.request("auth/register", newUserInfo, "POST");
    return { token: res.token, userDetail: newUserInfo };
  }

  /** Edit user profile. */

  static async editProfile(username, firstName, lastName, email) {
    let editedUserInfo = { firstName, lastName, email };
    let res = await this.request(`users/${username}`, editedUserInfo, "PATCH");

    return res;
  }

  /** Get user detail-- all info. */

  static async getUserDetail(username) {
    let userDetail = await this.request(`users/${username}`);
    return userDetail;
  }

  // obviously, you'll add a lot here ...
}

export default JoblyApi;
