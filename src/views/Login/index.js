import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { styles } from "./style";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import FormErrors from "../FormErrors";

function loginForm(props) {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <Tabs value={props.tabNumber} onChange={props.handleChangeTab}>
        <Tab label="Login" />
        <Tab label="Sign Up" />
      </Tabs>
      <form
        className={classes.loginForm}
        onSubmit={
          props.tabNumber === 0
            ? props.handleSubmitLogin
            : props.handleSubmitRegister
        }
      >
        <FormErrors formErrors={props.formErrors} tabNumber={props.tabNumber} />

        <TextField
          label="email"
          name="email"
          type="email"
          value={props.email}
          onChange={props.handleChange}
        />
        {props.tabNumber === 1 && (
          <TextField
            label="username"
            name="username"
            type="text"
            value={props.username}
            onChange={props.handleChange}
          />
        )}
        <TextField
          label="password"
          type="password"
          name="password"
          value={props.password}
          onChange={props.handleChange}
        />
        <Button
          variant="outlined"
          color="primary"
          size="medium"
          className={classes.btn}
          type="submit"
        >
          {props.tabNumber === 0 ? "LOGIN" : "SIGN UP"}
        </Button>
      </form>
    </Paper>
  );
}

export default withStyles(styles)(loginForm);
