import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import HeaderContainer from "../../containers/HeaderContainer";
import LoginContainer from "../../containers/LoginContainer";
import FilmListContainer from "../../containers/FilmsListContainer";
import FilmInfoContainer from "../../containers/FilmInfoContainer";

function withRoot(Component) {
  return class includeHeaderComponent extends React.Component {
    render() {
      return (
        <HeaderContainer>
          <Component />
        </HeaderContainer>
      );
    }
  };
}

function wrapper() {
  return (
    <Switch>
      <Route exact path="/" component={HeaderContainer} />
      <Route exact path="/login" component={withRoot(LoginContainer)} />
      <Route exact path="/films" component={withRoot(FilmListContainer)} />
      <Route exact path="/films/:id" component={withRoot(FilmInfoContainer)} />
      <Route exact path="/:id" component={withRoot(FilmInfoContainer)} />
    </Switch>
  );
}

export default withRouter(wrapper);
