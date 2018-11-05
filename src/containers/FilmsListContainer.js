import React, { Component } from "react";
import axios from "axios";
import FilmList from "../views/FilmList";
import { connect } from "react-redux";
import * as actions from "../actions/actions";

class FilmListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 0,
      sortBy: "title",
      category: "All"
    };

    window.onscroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        const url = `http://localhost:3001/api/films/pages/${
          this.state.currentPage
        }?sort=${this.state.sortBy}`;
        this.loadFilms(url, this.state.currentPage);
      }
    };
  }

  onChangeSorting = e => {
    switch (e.target.value) {
      case "rating": {
        this.setState(
          { currentPage: 0, sortBy: e.target.value, category: "All" },
          () => {
            const url = `http://localhost:3001/api/films/pages/0?sort=rating`;
            this.loadFilms(url, 0);
          }
        );
        break;
      }
      case "title":
      default: {
        this.setState(
          { currentPage: 0, sortBy: e.target.value, category: "All" },
          () => {
            const url = `http://localhost:3001/api/films/pages/0?sort=title`;
            this.loadFilms(url, 0);
          }
        );
        break;
      }
    }
  };

  componentWillMount() {
    this.props.onChangePage("films");
    const url = `http://localhost:3001/api/films/pages/${
      this.state.currentPage
    }?sort=${this.state.sortBy}`;
    this.loadFilms(url, this.state.currentPage);
  }

  loadFilms = (url, page) => {
    this.props.onLoadFilms(url, page, this.props.films);
    this.setState({ currentPage: this.state.currentPage + 1 });
  };

  render() {
    return (
      <FilmList
        films={this.props.films}
        onChangeSorting={this.onChangeSorting}
        sortBy={this.state.sortBy}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    pageName: state.catalog.currentPage,
    films: state.catalog.films,
    user: state.catalog.user,
    isLoading: state.catalog.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadFilms: (url, currentPage, films) => {
      dispatch(actions.loadFilmList(url, currentPage, films));
    },
    onSetUser: user => {
      dispatch(actions.setUser(user));
    },
    onChangePage: pageName => {
      dispatch(actions.setCurrentPage(pageName));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilmListContainer);
