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
    console.log(e.target.value);

    switch (e.target.value) {
      case "rating": {
        this.setState(
          { currentPage: 0, sortBy: e.target.value, category: "All" },
          () => {
            const url = `http://localhost:3001/api/films/pages/0?sort=rating`;
            console.log(`loading films by id`);
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
            console.log(`loading films by title`);
            this.loadFilms(url, 0);
          }
        );

        break;
      }
    }
  };

  onChangeCategory = e => {
    console.log(e.target.value);
    if (e.target.value !== "All") {
      this.setState({
        currentPage: 0,
        sortBy: "title",
        category: e.target.value
      });
      const url = `http://localhost:3001/api/films/categories/${
        e.target.value
      }/0`;

      this.loadFilms(url, 0);
    } else {
      this.setState(
        { currentPage: 0, sortBy: "title", category: e.target.value },
        () => {
          const url = "http://localhost:3001/api/films/pages/0";
          this.loadFilms(url, 0);
        }
      );
    }
  };

  componentWillMount() {
    this.props.onChangePage("films");
    const url = `http://localhost:3001/api/films/pages/${
      this.state.currentPage
    }?sort=${this.state.sortBy}`;
    this.loadFilms(url, this.state.currentPage);
    axios.get("http://localhost:3001/api/films/categories").then(res => {
      this.props.onLoadCategories(res.data);
    });
  }

  loadFilms = (url, page) => {
    this.props.onLoadFilms(url, page, this.props.films);
    this.setState({ currentPage: this.state.currentPage + 1 }, () =>
      console.log(this.state.currentPage)
    );
  };

  render() {
    return (
      <FilmList
        films={this.props.films}
        categories={this.props.categories}
        onChangeCategory={this.onChangeCategory}
        onChangeSorting={this.onChangeSorting}
        sortBy={this.state.sortBy}
        category={this.state.category}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    pageName: state.catalog.currentPage,
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
