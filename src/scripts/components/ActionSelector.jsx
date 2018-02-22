import React from "react";

import CreateWallet from "./CreateWallet";
import RestoreWallet from "./RestoreWallet";

const SCREENS = {
  create_wallet: CreateWallet,
  restore_wallet: RestoreWallet
};

export default class ActionSelector extends React.Component {
  state = {
    screen: "get-started"
  }

  handleCreateNewWallet = () => {
    this.goToScreen("create_wallet");
  }

  handleRestoreWallet = () => {
    this.goToScreen("restore_wallet");
  }

  frontPage = () => {
    return (
      <div className="center">
        <h1>What do you want to do?</h1>

        <p className="submit-wrapper">
          <button className="button primary" onClick={this.handleCreateNewWallet}>Create a new wallet</button>
          <button className="button primary" onClick={this.handleRestoreWallet}>Restore wallet</button>
        </p>
      </div>
    );
  }

  goToScreen = screen => {
    this.setState({screen});
  };

  render() {
    const {screen} = this.state;
    const Component = SCREENS[screen] || this.frontPage;

    return <Component goToScreen={this.goToScreen} />;
  }
}
