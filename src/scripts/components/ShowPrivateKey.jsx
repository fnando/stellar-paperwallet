import React from "react";
import PropTypes from "prop-types";
import QRCode from "qrcode.react";

import Key from "./Key";

export default class ShowPrivateKey extends React.Component {
  state = {
    showPrivateKey: false
  };

  static propTypes = {
    goToScreen: PropTypes.func.isRequired,
    privateKey: PropTypes.string.isRequired
  };

  privateKeyContents() {
    const {privateKey} = this.props;

    return (
      <div>
        <h2 className="mb0">Private Key</h2>
        <p>
          <Key value={privateKey} />
        </p>

        <p className="qrcode">
          <QRCode value={privateKey} />
        </p>
      </div>
    );
  }

  handleShowPrivateKey = () => {
    this.setState({showPrivateKey: true});
  };

  handleContinue = () => {
    const {goToScreen} = this.props;
    goToScreen("finish");
  };

  render() {
    const {showPrivateKey} = this.state;

    return (
      <div className="center hide-on-print">
        <h1>Your private key</h1>

        <p>
          Use the following private key to import your wallet into
          other apps.
        </p>

        <p className="red">
          <strong>WARNING:</strong>
          You may lose all your funds if this private key leaks.
        </p>

        {showPrivateKey && this.privateKeyContents()}

        <p className="submit-wrapper">
          <button onClick={this.handleShowPrivateKey} className="button secondary">Show private key</button>
          <button onClick={this.handleContinue} className="button primary
          ">Continue</button>
        </p>
      </div>
    );
  }
}
