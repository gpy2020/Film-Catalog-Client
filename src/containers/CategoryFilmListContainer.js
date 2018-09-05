import React, { Component } from "react";
import FilmList from "../views/FilmList";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions/actions";

class CategoryFilmListContainer extends Component {
  constructor() {
    super();

    this.state = {
      currentPage: 0
    };

    window.onscroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        console.log(`loading page: ${this.state.currentPage}...`);
        this.loadFilms();
      }
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps) {
      return true;
    }
    if (
      this.state !== nextState &&
      this.state.currentPage !== nextState.currentPage
    ) {
      return false;
    } else {
      return true;
    }
  }

  componentWillMount() {
    axios.get("http://localhost:3001/api/films/categories").then(res => {
      this.props.onLoadCategories(res.data);
    });
    this.loadFilms();
  }

  loadFilms = () => {
    const url = `http://localhost:3001/api/films/categories/${
      this.props.match.params.id
    }/${this.state.currentPage}`;
    this.props.onLoadFilms(url, this.state.currentPage, this.props.films);
    this.setState({ currentPage: this.state.currentPage + 1 });
  };

  render() {
    return (
      <FilmList films={this.props.films} categories={this.props.categories} />
    );
  }
}

const mapStateToProps = state => {
  console.log("category films");
  console.log(state.catalog.films);
  return {
    films: state.catalog.films,
    categories: state.catalog.categories,
    user: state.catalog.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadFilms: (url, currentPage, films) => {
      dispatch(actions.loadFilmList(url, currentPage, films));
    },
    onLoadCategories: categories => {
      dispatch(actions.setCategories(categories));
    },
    onSetUser: user => {
      dispatch(actions.setUser(user));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CategoryFilmListContainer));
