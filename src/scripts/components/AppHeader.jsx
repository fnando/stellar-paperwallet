import React from "react";

import logo from "../../images/logo.svg";

export default class AppHeader extends React.Component {
  render() {
    return (
      <header className="main-header hide-on-print">
        <img src={logo} alt="Stellar Paper Wallet" />
        <p>
          Make paper wallets to keep your Stellar addresses offline.
        </p>
      </header>
    );
  }
}
