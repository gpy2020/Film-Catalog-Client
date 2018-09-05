import React, { Component } from "react";
import axios from "axios";
import FilmList from "../views/FilmList";
import { connect } from "react-redux";
import * as actions from "../actions/actions";

class FilmListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0
    };

    window.onscroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        const url = `http://localhost:3001/api/films/pages/${
          this.state.currentPage
        }?`;
        this.loadFilms(url, this.state.currentPage);
      }
    };
  }

  onChangeCategory = e => {
    console.log(e.target.value);
    if (e.target.value !== "All") {
      this.setState({ currentPage: 0 });
      const url = `http://localhost:3001/api/films/categories/${
        e.target.value
      }/0`;

      this.loadFilms(url, 0);
    } else {
      this.setState({ currentPage: 0 }, () => {
        const url = "http://localhost:3001/api/films/pages/0";
        this.loadFilms(url, 0);
      });
    }
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props !== nextProps) {
  //     return true;
  //   }
  //   if (
  //     this.state !== nextState &&
  //     this.state.currentPage !== nextState.currentPage
  //   ) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  componentWillMount() {
    const url = `http://localhost:3001/api/films/pages/${
      this.state.currentPage
    }`;
    this.loadFilms(url, this.state.currentPage);
    axios.get("http://localhost:3001/api/films/categories").then(res => {
      this.props.onLoadCategories(res.data);
    });
  }

  loadFilms = (url, page) => {
    this.props.onLoadFilms(url, page, this.props.films);
    this.setState({ currentPage: this.state.currentPage + 1 });
  };

  render() {
    return (
      <FilmList
        films={this.props.films}
        categories={this.props.categories}
        currentCategory={this.state.currentCategory}
        onChangeCategory={this.onChangeCategory}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    films: state.catalog.films,
    categories: state.catalog.categories,
    user: state.catalog.user,
    isLoading: state.catalog.loading
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
)(FilmListContainer);
