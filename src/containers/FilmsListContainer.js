import React, { Component } from "react";
import axios from "axios";
import FilmList from "../views/FilmList";
import { connect } from "react-redux";
import * as actions from "../actions/actions";

class FilmListContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log(sessionStorage.getItem("token"));
    axios
      .get("http://localhost:3001/api/dashboard", {
        headers: {
          Authorization: sessionStorage.getItem("token")
        }
      })
      .then(res => {
        if (res.data.success) {
          this.props.onSetUser(res.data.user);
          console.log(res.data.user);
        } else {
          console.log("err");
        }
      })
      .catch(err => {
        console.log(err);
      });

    axios.get("http://localhost:3001/api/films/categories").then(res => {
      this.props.onLoadCategories(res.data);
    });
    axios.get("http://localhost:3001/api/films").then(res => {
      this.props.onLoadFilms(res.data);
    });
  }

  render() {
    return (
      <FilmList films={this.props.films} categories={this.props.categories} />
    );
  }
}

const mapStateToProps = state => {
  return {
    films: state.catalog.films,
    categories: state.catalog.categories,
    user: state.catalog.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadFilms: films => {
      dispatch(actions.setFilms(films));
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
