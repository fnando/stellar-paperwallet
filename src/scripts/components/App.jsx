import React from "react";

import ActionSelector from "./ActionSelector";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <AppHeader />
        <ActionSelector />
        <AppFooter />
      </div>
    );
  }
}
