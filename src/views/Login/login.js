import React from "react";
import FormErrors from "../FormErrors";
import "./style.css";

const loginForm = props => {
  return (
    <div className="root">
      <div className="tab">
        <button
          onClick={props.handleChangeTab}
          value={0}
          className={props.tabNumber == 0 ? "active" : ""}
        >
          Login
        </button>
        <button
          onClick={props.handleChangeTab}
          value={1}
          className={props.tabNumber == 0 ? "" : "active"}
        >
          Sign Up
        </button>
      </div>
      <form
        type="submit"
        className="loginForm"
        onSubmit={
          props.tabNumber === 0
            ? props.handleSubmitLogin
            : props.handleSubmitRegister
        }
      >
        <FormErrors formErrors={props.formErrors} tabNumber={props.tabNumber} />
        <input
          type="email"
          name="email"
          value={props.email}
          onChange={props.handleChange}
          placeholder="email"
          className="inputField"
        />
        {props.tabNumber == 1 && (
          <input
            name="username"
            type="text"
            value={props.username}
            onChange={props.handleChange}
            placeholder="username"
            className="inputField"
          />
        )}
        <input
          name="password"
          type="password"
          value={props.password}
          onChange={props.handleChange}
          placeholder="password"
          className="inputField"
        />
        <button type="submit" className="submitButton">
          {props.tabNumber == 0 ? "LOGIN" : "SIGN UP"}
        </button>
      </form>
    </div>
  );
};

export default loginForm;
