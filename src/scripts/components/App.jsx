import React from "react";

import ActionSelector from "./ActionSelector";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import LiveSiteChecker from "./LiveSiteChecker";

export default class App extends React.Component {
  render() {
    return (
      <div>
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
