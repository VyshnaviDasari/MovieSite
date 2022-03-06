import React from "react";

//  Render  filters on right pane
class RightPane extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onformchange(event);
  }

  render() {
    return (
      <div className="rightpane">
        <label>
          Movie Type:
          <select
            name="showType"
            value={this.props.showType}
            onChange={this.handleChange}
          >
            <option value="movie">Movie</option>
            <option value="tv">Tvshows</option>
          </select>
        </label>
        <RenderGenre
          handleChange={this.handleChange}
          genre={this.props.genre}
          showType={this.props.showType}
        />
        <label>
          Year:
          <input
            type="number"
            name="startYear"
            min="1800"
            max="3000"
            value={this.props.startYear}
            onChange={this.handleChange}
          />
          -
          <input
            type="number"
            name="endYear"
            min="1800"
            max="3000"
            value={this.props.endYear}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Voting:
          <select
            name="voting"
            value={this.props.voting}
            onChange={this.handleChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <label>
          Theme:
          <select
            name="theme"
            value={this.props.theme}
            onChange={this.handleChange}
          >
            <option value="theme_light">Light Theme</option>
            <option value="theme_dark">Dark Theme</option>
          </select>
        </label>
      </div>
    );
  }
}

class RenderGenre extends React.Component {
  constructor() {
    super();
    this.state = {
      data: "",
    };
  }

  componentDidMount() {
    this.getMovieData();
  }

  getMovieData() {
    const api_key = "25d13f07b1b2c1c20df00d66f731482d";
    return fetch(
      `https://api.themoviedb.org/3/genre/${this.props.showType}/list?api_key=${api_key}&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          data: data,
        });
      });
  }

  render() {
    const { data } = this.state;
    if (data !== "") {
      return (
        <label>
          Genre:
          <select
            name="genre"
            value={this.props.genre}
            onChange={this.props.handleChange}
          >
            <option value="all">All</option>;
            {data.genres.map((genre, index) => {
              return (
                <React.Fragment key={index}>
                  <option
                    value={`${genre.name}-${genre.id}`}
                  >{`${genre.name}`}</option>
                </React.Fragment>
              );
            })}
          </select>
        </label>
      );
    }
    return null;
  }
}

export default RightPane;
