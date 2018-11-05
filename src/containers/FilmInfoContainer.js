import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import FilmInfo from "../views/filmInfo/filmInfo";
import * as actions from "../actions/actions";

class FilmInfoContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      film: {},
      value: 0,
      comment: "",
      isAuthorized: false,
      userMark: null,
      imdbRating: null
    };
  }

  checkMark = (user, film) => {
    if (film) {
      return film.marks.find(mark => {
        return mark.user === user.username;
      });
    }
    return this.state.film.marks.find(mark => {
      return mark.user === user.username;
    });
  };

  updateRating = film => {
    const newRating = +(
      film.marks.reduce((sum, currentMark) => {
        return sum + +currentMark.mark;
      }, 0) / film.marks.length
    ).toFixed(1);
    axios
      .put(`http://localhost:3001/api/films/${this.props.match.params.id}`, {
        ...film,
        rating: newRating
      })
      .then(res => {
        const mark = this.checkMark(this.props.user, film);
        this.setState({
          film: res.data,
          userMark: mark ? mark.mark : null
        });
      });
  };

  setMark = marks => {
    axios
      .put(`http://localhost:3001/api/films/${this.props.match.params.id}`, {
        ...this.state.film,
        marks: marks
      })
      .then(res => {
        this.updateRating(res.data);
      });
  };

  onClickMark = e => {
    if (this.state.isAuthorized) {
      if (!this.checkMark(this.props.user)) {
        const filmMarks = [
          ...this.state.film.marks,
          { user: this.props.user.username, mark: +e.target.value }
        ];
        this.setMark(filmMarks);
      } else {
        const filmMarks = this.state.film.marks.map(singleMark => {
          return singleMark.user === this.props.user.username
            ? { ...singleMark, mark: e.target.value }
            : singleMark;
        });
        this.setMark(filmMarks);
      }
    } else {
      console.log(`err: not authorized`);
    }
  };

  handleComment = e => {
    const filmComments = [
      ...this.state.film.comments,
      { user: this.props.user.username, comment: this.state.comment }
    ];
    axios
      .put(`http://localhost:3001/api/films/${this.props.match.params.id}`, {
        ...this.state.film,
        comments: filmComments
      })
      .then(res => {
        this.setState({ film: res.data, comment: "" });
      })
      .catch(err => {});
    e.preventDefault();
  };

  handleInput = e => {
    this.setState({ comment: e.target.value });
  };

  switchTabs = event => {
    this.setState({ value: event.target.value });
  };

  loadDog = () => {};

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.email === "") {
      this.setState({ isAuthorized: false, userMark: null });
    }
  }

  getRating = () => {
    axios.get("http://localhost:3001/api/films/getRating").then(res => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(res.data, "text/xml");
      const imdbRating = xmlDoc.getElementsByTagName("imdb_rating")[0]
        .childNodes[0].nodeValue;
      this.setState({ imdbRating });
    });
  };

  componentWillMount() {
    axios
      .get("http://localhost:3001/api/dashboard", {
        headers: {
          Authorization: sessionStorage.getItem("token")
        }
      })
      .then(res => {
        if (res.data.success) {
          this.props.onSetUser(res.data.user);
          const mark = this.checkMark(res.data.user, this.state.film);
          this.setState({
            isAuthorized: true,
            userMark: mark ? mark.mark : null
          });
        } else {
          console.log("err");
        }
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get(`http://localhost:3001/api/films/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ film: res.data });
      });
    this.getRating();
  }

  render() {
    return (
      <FilmInfo
        film={this.state.film}
        value={this.state.value}
        handleChange={this.switchTabs}
        isAuthorized={this.state.isAuthorized}
        onClickMark={this.onClickMark}
        userMark={this.state.userMark}
        filmID={this.props.match.params.id}
        onRequestDog={this.props.onRequestDog}
        isDogLoading={this.props.isDogLoading}
        dogImage={this.props.dogImage}
        dogError={this.props.dogError}
        imdbRating={this.state.imdbRating}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.catalog.user,
    isDogLoading: state.catalog.isDogLoading,
    dogImage: state.catalog.dogImage,
    dogError: state.catalog.dogError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetUser: user => {
      dispatch(actions.setUser(user));
    },
    onRequestDog: () => dispatch({ type: "LOAD_DOG_REQUEST" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(FilmInfoContainer));
