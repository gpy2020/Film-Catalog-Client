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
      users: [],
      openImage: false,
      imageLink: ""
    };
  }

  onOpenImage = e => {
    console.log(e.target);
    this.setState({ openImage: true, imageLink: e.target.src });
  };

  onCloseImage = e => {
    this.setState({ openImage: false });
  };

  handleComment = e => {
    console.log("user");
    console.log(this.props.user);
    const filmComments = [
      ...this.state.film.comments,
      { user: this.props.user.username, comment: this.state.comment }
    ];
    console.log(this.props.user);
    axios
      .put(`http://localhost:3001/api/films/${this.props.match.params.id}`, {
        ...this.state.film,
        comments: filmComments
      })
      .then(res => {
        this.setState({ film: res.data, comment: "" });
        // console.log(this.state.film.comments);
      })
      .catch(err => {
        console.log(err);
      });
    e.preventDefault();
  };

  handleInput = e => {
    this.setState({ comment: e.target.value });
  };

  switchTabs = (event, value) => {
    this.setState({ value });
  };

  componentWillMount() {
    axios
      .get("http://localhost:3001/api/dashboard", {
        headers: {
          Authorization: sessionStorage.getItem("token")
        }
      })
      .then(res => {
        console.log("authorized");
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

    axios
      .get(`http://localhost:3001/api/films/${this.props.match.params.id}`)
      .then(res => {
        console.log(res.data);
        this.setState({ film: res.data });
        console.log(this.state.film);
        // const userIDs = res.data.comments.map(comment => comment.user);
        // Promise.all(userIDs.map(userID => {
        // }))
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
