import React, { Component } from "react";
import FilmCard from "../views/FilmCard/filmCard";

class FilmCardContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <FilmCard film={this.props.film} />;
  }
}
export default FilmCardContainer;
