import React, { Component } from "react";
import Login from "../views/Login";
import axios from "axios";
import { Redirect } from "react-router-dom";

//TODO REDUX

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
          this.setState({ user: res.data, isRedirect: true });
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
      tabNumber: value,
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
        user={this.state.user}
        tabNumber={this.state.tabNumber}
        handleChangeTab={this.handleChangeTab}
        handleSubmitLogin={this.handleSubmitLogin}
        formErrors={this.state.formErrors}
        formValid={this.setState.formValid}
      />
    );
  }
}

export default LoginContainer;
