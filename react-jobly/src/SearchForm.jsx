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
  const [searchTerm, setSearchTerm] = useState("");

  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleSearch(searchTerm);
    setSearchTerm("");
  }


  return (
    <div>
    <form onSubmit={handleSubmit}>
      <input value={searchTerm} onChange={handleChange} />
      <button>Search!</button>
    </form>
    </div>
  )
}

export default SearchForm