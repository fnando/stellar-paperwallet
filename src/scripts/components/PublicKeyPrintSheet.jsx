import React from "react";
import PropTypes from "prop-types";
import QRCode from "qrcode.react";

import PrintButton from "./PrintButton";
import Key from "./Key";
import logo from "../../images/logo-print-horizontal.svg";

export default class PublicKeyPrintSheet extends React.Component {
  static propTypes = {
    goToScreen: PropTypes.func.isRequired,
    publicKey: PropTypes.string.isRequired
  };

  handleContinue = () => {
    const {goToScreen} = this.props;
    goToScreen("show-private-key");
  };

  render() {
    const {publicKey} = this.props;

    return (
      <div className="print-sheet public-key-print-sheet center-on-screen">
        <header className="show-on-print">
          <img className="logo" src={logo} alt="" />
        </header>

        <h1 className="hide-on-print">Your public key</h1>
        <p>
          This is your public address. You can pass it
          to other people, so that they can transfer
          lumens to your account.
        </p>

        <p className="mb0">
          <Key value={publicKey} />
        </p>

        <p className="qrcode">
          <QRCode value={publicKey} />
        </p>

        <p className="hide-on-print submit-wrapper center">
          <PrintButton />
          <button className="button primary" onClick={this.handleContinue}>Continue</button>
        </p>
      </div>
    );
  }
}
