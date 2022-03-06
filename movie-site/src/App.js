import "./App.css";
import Header from "./Header";
import RenderMovies from "./MoviesListSpace";
import RightPane from "./Rightpane";
import React from "react";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      theme: "theme_dark",
      searchquery: "",
      selectedMovieList: "popular",
      showType: "movie",
      genre: "all",
      startYear: 2018,
      endYear: 2020,
      voting: 3,
    };
  }

  render() {
    const {
      theme,
      searchquery,
      selectedMovieList,
      showType,
      genre,
      startYear,
      endYear,
      voting,
    } = this.state;
    return (
      <div className={`MovieApp ${theme}`}>
        <div className="leftPane">
          <Header
            selectedMovieList={selectedMovieList}
            changedSelectedMovieList={this.changedSelectedMovieList}
            onSearchInputChange={this.onSearchInputChange}
          />
          <RenderMovies
            searchquery={searchquery}
            selectedMovieList={selectedMovieList}
            showType={showType}
            genre={genre}
            startYear={startYear}
            endYear={endYear}
            voting={voting}
          />
        </div>
        <RightPane
          theme={theme}
          showType={showType}
          genre={genre}
          startYear={startYear}
          endYear={endYear}
          voting={voting}
          onformchange={this.onformchange}
        />
      </div>
    );
  }

  changedSelectedMovieList = (value) => {
    this.setState({
      selectedMovieList: value,
    });
  };

  onSearchInputChange = (e) => {
    this.setState({
      searchquery: e.target.value,
    });
  };

  onformchange = (event) => {
    let state;
    const value = event.target.value;
    switch (event.target.name) {
      case "showType":
        state = {
          showType: value,
        };
        break;
      case "genre":
        state = {
          genre: value,
        };
        break;
      case "startYear":
        state = {
          startYear: value,
        };
        break;
      case "endYear":
        state = {
          endYear: value,
        };
        break;
      case "voting":
        state = {
          voting: value,
        };
        break;
      case "theme":
        state = {
          theme: value,
        };
        break;
    }
    this.setState(state);
  };
}

export default App;
