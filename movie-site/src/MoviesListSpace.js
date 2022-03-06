import React from "react";

//  Render movies
class RenderMovies extends React.Component {
  constructor() {
    super();
    this.state = {
      data: "",
    };
  }

  componentDidMount() {
    this.getMovieData();
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.getMovieData();
    }
  }

  getMovieData() {
    getMovieDataFromAPI(
      this.props.searchquery,
      this.props.selectedMovieList,
      this.props.showType,
      this.props.genre,
      this.props.startYear,
      this.props.endYear,
      this.props.voting
    ).then((movieData) => {
      this.setState({
        data: movieData,
      });
    });
  }

  render() {
    const { data } = this.state;
    if (data !== "") {
      return (
        <div className="movieList">
          {data.results.map((movie, index) => {
            return (
              <div key={index} className="movie" data-testid="movie">
                <RenderEachMovie movie={movie} />
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  }
}

function RenderEachMovie(props) {
  const {
    poster_path,
    original_title,
    genre_ids,
    release_date,
    first_air_date,
    original_name,
  } = props.movie;
  const releaseDate = release_date || first_air_date;
  let year;
  if (releaseDate) {
    year = releaseDate.split("-")[0];
  }
  return (
    <>
      <img
        src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
        alt={poster_path}
      />
      <p>{original_title || original_name}</p>
      <span>{genre_ids[0]}, </span>
      <span>{year}</span>
    </>
  );
}

function getMovieDataFromAPI(
  searchquery,
  selectedMovieList,
  showType,
  genre,
  startYear,
  endYear,
  voting
) {
  const api_key = "25d13f07b1b2c1c20df00d66f731482d";
  // Return search results in case if there is search query
  if (searchquery !== "") {
    return search(showType, api_key, searchquery);
  }
  // Else return selected movie list results
  let url, sort_by;
  switch (selectedMovieList) {
    case "popular":
      sort_by = "popularity.desc";
      break;
    case "newest":
      sort_by = "primary_release_date.desc";
      break;
    case "toprated":
      sort_by = "vote_average.desc";
      break;
    default:
      url = "popularity.desc";
      break;
  }
  if (selectedMovieList === "trending") {
    url = `https://api.themoviedb.org/3/trending/${showType}/day?api_key=${api_key}`;
  } else {
    url =
      genre === "all"
        ? `https://api.themoviedb.org/3/discover/${showType}?api_key=${api_key}&language=en-US&page=1&sort_by=${sort_by}&vote_average.gte=${voting}&primary_release_date.lte=${endYear}&primary_release_date.gte=${startYear}`
        : `https://api.themoviedb.org/3/discover/${showType}?api_key=${api_key}&language=en-US&page=1&sort_by=${sort_by}&vote_average.gte=${voting}&primary_release_date.lte=${endYear}&primary_release_date.gte=${startYear}&with_genres=${
            genre.split("-")[1]
          }`;
  }

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

function search(showType, api_key, searchquery) {
  const url = `https://api.themoviedb.org/3/search/${showType}?api_key=${api_key}&query=${searchquery}&language=en-US&page=1&include_adult=false`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

export default RenderMovies;
