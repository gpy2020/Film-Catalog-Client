import React, { Component } from "react";
import Login from "../views/Login/login";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions/actions";

class LoginContainer extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      username: "",
      user: {},
      isRedirect: false,
      tabNumber: 0,
      formErrors: { email: "", password: "", serverErrors: "" },
      emailValid: false,
      passwordValid: false,
      formValid: false
    };
  }

  componentWillMount() {
    this.props.onChangePage("login");
    axios
      .get("http://localhost:3001/api/dashboard", {
        headers: {
          Authorization: sessionStorage.getItem("token")
        }
      })
      .then(res => {
        if (res.data.success) {
          this.props.onSetUser(res.data.user);
          this.setState({ isRedirect: true });
        } else {
          console.log("err");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
    this.validateField(name, value);
  };

  validateField = (field, value) => {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch (field) {
      case "email": {
        emailValid = !!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : " is invalid";
        this.setState({ formErrors: fieldValidationErrors });
        break;
      }
      case "password": {
        passwordValid = value.length > 5;
        fieldValidationErrors.password = passwordValid ? "" : "is too short";
        this.setState({ formErrors: fieldValidationErrors });
        break;
      }
    }
    this.validateForm();
  };

  validateForm = () => {
    this.setState({
      formValid: this.state.emailValid && this.state.passwordValid
    });
  };

  handleSubmitRegister = e => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/api/register", {
        email: this.state.email,
        password: this.state.password,
        username: this.state.username
      })
      .then(res => {
        if (res.data.success) {
          this.setState({ user: res.data.user, isRedirect: true });
          sessionStorage.setItem("token", res.data.token);
          console.log(res.data);
        } else {
          let validationError = this.state.formErrors;
          validationError.serverErrors = res.data.message;
          this.setState({ formErrors: validationError });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleSubmitLogin = e => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/auth", {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        if (res.data.success === true) {
          console.log("logging");
          this.props.onSetUser(res.data.user);
          this.setState({ isRedirect: true });
          sessionStorage.setItem("token", res.data.token);
        } else {
          this.setState({ formErrors: { serverErrors: res.data.message } });
          console.log(this.state.formErrors);
        }
      });
  };

  handleChangeTab = (event, value) => {
    this.setState({
      email: "",
      tabNumber: event.target.value,
      formErrors: { serverErrors: "", email: "", password: "" },

      password: "",
      username: ""
    });
  };

  render() {
    return this.state.isRedirect ? (
      <Redirect to="/films" />
    ) : (
      <Login
        handleChange={this.handleChange}
        email={this.state.email}
        password={this.state.password}
        username={this.state.username}
        handleSubmitRegister={this.handleSubmitRegister}
        tabNumber={this.state.tabNumber}
        handleChangeTab={this.handleChangeTab}
        handleSubmitLogin={this.handleSubmitLogin}
        formErrors={this.state.formErrors}
        formValid={this.setState.formValid}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSetUser: user => {
      dispatch(actions.setUser(user));
    },
    onChangePage: pageName => {
      dispatch(actions.setCurrentPage(pageName));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(LoginContainer);
