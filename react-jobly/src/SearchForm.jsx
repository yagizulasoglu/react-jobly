import React, { useState } from "react";


/**
 * SearchForm
 * State: term
 *
 * Props:
 * - handleSearch Function
 * - InitialList
 *
 * App -> RoutesList -> JobsList -> SearchForm
 * App -> RoutesList -> CompaniesList -> SearchForm
 */

function SearchForm({handleSearch}) {
  const [term, setTerm] = useState("");

  function handleChange(evt) {
    setTerm(evt.target.value);
  }
//TODO: Look at api.js!!
  function handleSubmit(evt) {
    evt.preventDefault();
    handleSearch(term);
    console.log("we are here searchform");
    setTerm("");
  }


  return (
    <div>
    <form onSubmit={handleSubmit}>
      <input value={term} onChange={handleChange} />
      <button>Search!</button>
    </form>
    </div>
  )
}

export default SearchForm