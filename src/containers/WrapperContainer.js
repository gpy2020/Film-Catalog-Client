import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Wrapper from "../views/Wrapper";

class WrapperContainer extends Component {
  render() {
    return <Wrapper />;
  }
}

export default withRouter(WrapperContainer);
