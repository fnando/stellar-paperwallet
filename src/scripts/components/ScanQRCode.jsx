import React from "react";
import PropTypes from "prop-types";
import QrReader from "react-qr-reader";
import {Keypair} from "stellar-base";

import WalletRestored from "./WalletRestored";

const ERRORS = {
  NotFoundError: "No camera found.",
  NotAllowedError: "No permission to access the camera."
};

export default class ScanQRCode extends React.Component {
  state = {
    error: null,
    screen: "splash"
  };

  static propTypes = {
    goToScreen: PropTypes.func.isRequired
  };

  handleError = (error) => {
    if (!error) {
      return;
    }

    const message = ERRORS[error.name] || error.message;

    this.setState({error: message});
  };

  handleScan = (privateKey) => {
    if (!privateKey) {
      return;
    }

    if (!privateKey.match(/^S[A-Z0-9]{55}$/)) {
      this.setState({error: "Invalid private key format"});
      return;
    }

    const keypair = Keypair.fromSecret(privateKey);
    const publicKey = keypair.publicKey();

    this.setState({screen: "confirmation", publicKey, privateKey});
  };

  handleCancel = () => {
    const {goToScreen} = this.props;
    goToScreen("splash");
  };

  splashScreen() {
    const {error, privateKey, publicKey} = this.state;
    const errorMessage = error && <p className="error-message">{error}</p>;

    return (
      <div className="center">
        <h1>Restoring your wallet</h1>

        <p>
          To restore your wallet using a QR Code, please make
          we need access to your camera.
        </p>

        <div className="camera">
          <QrReader
            onError={this.handleError}
            onScan={this.handleScan} />
        </div>

        {errorMessage}

        <p className="submit-wrapper">
          <button onClick={this.handleCancel} className="button primary">
            Cancel
          </button>
        </p>
      </div>
    );
  }

  render() {
    const {screen, privateKey, publicKey} = this.state;
    const {goToScreen} = this.props;

    switch (screen) {
      case "splash":
        return this.splashScreen();
      case "confirmation":
        return <WalletRestored privateKey={privateKey} publicKey={publicKey} goToScreen={goToScreen} />;
    }
  }
}
