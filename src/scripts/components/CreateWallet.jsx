import React from "react";
import PropTypes from "prop-types";
import StellarHDWallet from "stellar-hd-wallet";

import MnemonicPrintSheet from "./MnemonicPrintSheet";
import PublicKeyPrintSheet from "./PublicKeyPrintSheet";
import ShowPrivateKey from "./ShowPrivateKey";
import ConfirmWords from "./ConfirmWords";

export default class CreateWallet extends React.Component {
  state = {
    screen: "splash",
    mnemonic: null
  };

  static propTypes = {
    goToScreen: PropTypes.func.isRequired
  };

  handleStart = () => {
    const mnemonicString = StellarHDWallet.generateMnemonic();
    const mnemonic = mnemonicString.split(" ");
    const wallet = StellarHDWallet.fromMnemonic(mnemonicString);
    const privateKey = wallet.getSecret(0);
    const publicKey = wallet.getPublicKey(0);
    const screen = "show-words";

    this.setState({mnemonic, screen, privateKey, publicKey});
  };

  handleGoToBeginning = () => {
    const {goToScreen} = this.props;
    goToScreen("get-started");
  };

  splashScreen() {
    return (
      <div className="center">
        <h1 className="hide-on-print">Creating a new wallet</h1>

        <p>
          You'll be asked to write down 24 words (you can also print the list).
        </p>
        <p className="red">
          <strong>ATTENTION:</strong> without these words (or your private key)
          you won't be able to restore your wallet.
          Please follow the instructions.
        </p>
        <p className="submit-wrapper">
          <button className="button primary" onClick={this.handleStart}>Start</button>
        </p>
      </div>
    );
  }

  finishScreen() {
    return (
      <div className="center">
        <h1 className="hide-on-print">You're all set!</h1>

        <p>
          Remember to keep your recovery phrase safe.
          You will lose access to your lumens if you lose your
          recovery phrase and/or private key.
        </p>

        <p className="submit-wrapper">
          <button className="button primary" onClick={this.handleGoToBeginning}>I Undestand!</button>
        </p>
      </div>
    );
  }

  goToScreen = (screen) => {
    this.setState({screen});
  };

  render() {
    const {screen, mnemonic, privateKey, publicKey} = this.state;

    switch (screen) {
      case "splash":
        return this.splashScreen();
      case "show-words":
        return <MnemonicPrintSheet goToScreen={this.goToScreen} mnemonic={mnemonic} privateKey={privateKey} />;
      case "confirm-words":
        return <ConfirmWords goToScreen={this.goToScreen} mnemonic={mnemonic} />;
      case "print-public-key":
        return <PublicKeyPrintSheet publicKey={publicKey} goToScreen={this.goToScreen} mnemonic={mnemonic} />;
      case "show-private-key":
        return <ShowPrivateKey privateKey={privateKey} goToScreen={this.goToScreen} />;
      case "finish":
        return this.finishScreen();
    }
  }
}
