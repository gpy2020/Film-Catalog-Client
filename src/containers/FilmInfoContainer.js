import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import FilmInfo from "../views/filmInfo";
import * as actions from "../actions/actions";

class FilmInfoContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      film: {},
      value: 0,
      comment: "",
      openImage: false,
      imageLink: "",
      isAuthorized: false,
      userMark: null
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
  };

  onOpenImage = e => {
    this.setState({ openImage: true, imageLink: e.target.src });
  };

  onCloseImage = e => {
    this.setState({ openImage: false });
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

  switchTabs = (event, value) => {
    this.setState({ value });
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.user.email) {
      this.setState({ isAuthorized: false });
    }
  }

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
  }

  render() {
    return (
      <FilmInfo
        film={this.state.film}
        value={this.state.value}
        handleChange={this.switchTabs}
        handleComment={this.handleComment}
        handleInput={this.handleInput}
        text={this.state.comment}
        openImage={this.state.openImage}
        onOpenImage={this.onOpenImage}
        onCloseImage={this.onCloseImage}
        imageLink={this.state.imageLink}
        isAuthorized={this.state.isAuthorized}
        onClickMark={this.onClickMark}
        userMark={this.state.userMark}
        filmID={this.props.match.params.id}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.catalog.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetUser: user => {
      dispatch(actions.setUser(user));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(FilmInfoContainer));
