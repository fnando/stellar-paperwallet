import React from "react";
import ActionSelector from "./ActionSelector";
import AppFooter from "./AppFooter";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <ActionSelector />
        <AppFooter />
      </div>
    );
  }
}
