import React from "react";
import classNames from "classnames";

import ActionSelector from "./ActionSelector";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import LiveSiteChecker from "./LiveSiteChecker";

export default class App extends React.Component {
  state = {
    fadeIn: false
  };

  componentDidMount() {
    setTimeout(() => this.setState({fadeIn: true}), 100);
  }

  render() {
    const {fadeIn} = this.state;
    const className = classNames("app", {"fade-in": fadeIn});

    return (
      <div className={className}>
        <LiveSiteChecker />
        <div className="container">
          <AppHeader />
          <ActionSelector />
          <AppFooter />
        </div>
      </div>
    );
  }
}
