import { useState, useCallback } from "react";
import { debounce } from "lodash";

//  Render whole Header Component
function Header(props) {
  const { selectedMovieList, changedSelectedMovieList, onSearchInputChange } =
    props;
  return (
    <div className="header">
      <p> Discover </p>
      <MovieListType
        selectedMovieList={selectedMovieList}
        changedSelectedMovieList={changedSelectedMovieList}
      />
      <SearchBar onSearchInputChange={onSearchInputChange} />
    </div>
  );
}

// Render Movie List Types - Popular, Trending,  Newest,  Top rated
function MovieListType(props) {
  return (
    <div className="selectedMovieList">
      <button
        onClick={(e) => props.changedSelectedMovieList(e.target.value)}
        value="popular"
      >
        Popular
      </button>
      <button
        value="trending"
        onClick={(e) => props.changedSelectedMovieList(e.target.value)}
      >
        Trending
      </button>
      <button
        value="newest"
        onClick={(e) => props.changedSelectedMovieList(e.target.value)}
      >
        Newest
      </button>
      <button
        value="toprated"
        onClick={(e) => props.changedSelectedMovieList(e.target.value)}
      >
        Top Rated
      </button>
    </div>
  );
}

// Render Search
function SearchBar(props) {
  const [searchquery, setsearchquery] = useState("");
  // Used debounce for search
  const debounceOnChange = useCallback(
    debounce(props.onSearchInputChange, 400),
    []
  );

  return (
    <div className="Search">
      <input
        className="search"
        type="text"
        value={searchquery}
        placeholder="Search Here"
        onChange={(e) => {
          setsearchquery(e.target.value);
          debounceOnChange(e);
        }}
      />
    </div>
  );
}

export default Header;
