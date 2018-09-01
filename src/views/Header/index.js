import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link } from "react-router-dom";

function header(props) {
  return (
    <div>
      <AppBar position="static">
        <Tabs value={props.tabNumber} scrollable>
          <Tab label="Films" component={Link} to="/films" />
          <Tab label="Login" component={Link} to="/login" />
        </Tabs>
      </AppBar>
    </div>
  );
}
export default header;
