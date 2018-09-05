import React, { Component } from "react";
import Header from "../views/Header";
import { connect } from "react-redux";
import * as actions from "../actions/actions";

class HeaderContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabNumber: 0
    };
  }

  onLogout = () => {
    sessionStorage.removeItem("token");
    this.props.onLogout();
  };

  render() {
    return (
      <React.Fragment>
        <Header tabNumber={this.props.tabNumber} onLogout={this.onLogout} />
        {this.props.children}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    tabNumber: state.catalog.currentTab
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => {
      dispatch(actions.removeUser());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderContainer);
