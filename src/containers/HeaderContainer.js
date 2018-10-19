import React, { Component } from "react";
import Header from "../views/Header/header";
import { connect } from "react-redux";
import * as actions from "../actions/actions";
import axios from "axios";

class HeaderContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthorized: false,
      anchorEl: null,
      menu: false
    };
  }

  onSearch = e => {
    const title = e.target.value;
    this.setState({ currentPage: 0 }, () => {
      const url = `http://localhost:3001/api/films/pages/${
        this.state.currentPage
      }?sort=${this.state.sortBy}&search=${title}`;
      this.loadFilms(url, this.state.currentPage);
    });
  };

  loadFilms = (url, page) => {
    this.props.onLoadFilms(url, page, this.props.films);
    this.setState({ currentPage: this.state.currentPage + 1 }, () =>
      console.log(this.state.currentPage)
    );
  };

  handleMenu = event => {
    console.log(event.currentTarget);
    this.setState({ anchorEl: event.currentTarget, menu: true });
  };

  handleClose = () => {
    this.setState({ anchorEl: null, menu: false });
  };

  componentWillMount() {
    console.log(this.props.user);
    axios
      .get("http://localhost:3001/api/dashboard", {
        headers: {
          Authorization: sessionStorage.getItem("token")
        }
      })
      .then(res => {
        if (res.data.success) {
          this.props.onSetUser(res.data.user);
          this.setState({ isAuthorized: true });
        }
      })
      .catch(err => console.log(err));
  }

  onLogout = () => {
    sessionStorage.removeItem("token");
    this.props.onLogout();
  };

  render() {
    return (
      <React.Fragment>
        <Header
          pageName={this.props.pageName}
          onLogout={this.onLogout}
          isAuthorized={this.state.isAuthorized}
          user={this.props.user}
          handleMenu={this.handleMenu}
          handleClose={this.handleClose}
          menu={this.state.menu}
          anchorEl={this.state.anchorEl}
          onSearch={this.onSearch}
        />
        {this.props.children}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    pageName: state.catalog.currentPage,
    user: state.catalog.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => {
      dispatch(actions.removeUser());
    },
    onSetUser: user => {
      dispatch(actions.setUser(user));
    },
    onLoadFilms: (url, currentPage, films) => {
      dispatch(actions.loadFilmList(url, currentPage, films));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderContainer);
