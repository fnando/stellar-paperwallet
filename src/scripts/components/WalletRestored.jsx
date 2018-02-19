import React from "react";
import PropTypes from "prop-types";

export default class WalletRestored extends React.Component {
  static propTypes = {
    goToScreen: PropTypes.func.isRequired,
    mnemonic: PropTypes.array,
    privateKey: PropTypes.string.isRequired,
    publicKey: PropTypes.string.isRequired
  };

  handleContinue = () => {
    const {goToScreen, publicKey, privateKey, mnemonic} = this.props;
    const screen = mnemonic ? "show-words" : "print-public-key";

    goToScreen(screen, {privateKey, publicKey, mnemonic: mnemonic || []});
  };

  render() {
    return (
      <div className="center">
        <h1>We restored your wallet!</h1>
        <p>
          Now you can print your public address, which you'll use to
          transfer lumens to it. You can also view your your private key.
        </p>

        <p className="submit-wrapper">
          <button onClick={this.handleContinue} className="button primary">Continue</button>
        </p>
      </div>
    );
  }
}
