import React, { Component } from "react";
import Header from "../views/Header";

class HeaderContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabNumber: 0
    };
  }

  render() {
    return (
      <React.Fragment>
        <Header tabNumber={this.state.tabNumber} />
        {this.props.children}
      </React.Fragment>
    );
  }
}

export default HeaderContainer;
