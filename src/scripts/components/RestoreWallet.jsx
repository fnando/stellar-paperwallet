import React from "react";
import PropTypes from "prop-types";

import InputWords from "./InputWords";
import ScanQRCode from "./ScanQRCode";
import PublicKeyPrintSheet from "./PublicKeyPrintSheet";
import ShowPrivateKey from "./ShowPrivateKey";
import MnemonicPrintSheet from "./MnemonicPrintSheet";
import RestoreFromMnemonic from "./RestoreFromMnemonic";

export default class RestoreWallet extends React.Component {
  state = {
    currentLanguage: "english",
    mnemonic: [],
    privateKey: null,
    publicKey: null,
    screen: "splash",
    wallet: null
  };

  static propTypes = {
    goToScreen: PropTypes.func.isRequired
  };

  handleGoToBeginning = () => {
    const {goToScreen} = this.props;
    goToScreen("get-started");
  };

  handleRestoreFromMnemonic = () => {
    this.goToScreen("restore-from-mnemonic");
  };

  handleEnterWordsManually = () => {
    this.goToScreen("input-words");
  };

  handleScanQRCode = () => {
    this.goToScreen("scan-qrcode");
  };

  goToScreen = (screen, state = {}) => {
    this.setState({...state, screen});
  };

  splashScreen = () => {
    return (
      <div className="center">
        <h1 className="hide-on-print">Restoring your wallet</h1>

        <p>
          There are two ways you can restore your wallet:
        </p>

        <div className="left panel">
          <h2>Entering words manually</h2>

          <p>
            You'll be asked to inform 24 words.
            Without these words you won't be able to restore your wallet.
          </p>

          <p>
            <button className="button primary" onClick={this.handleRestoreFromMnemonic}>Enter words manually</button>
          </p>
        </div>

        <div className="left panel">
          <h2>Scan QR Code</h2>

          <p>
            If you printed the recovery phrase card, you can scan
            the QR Code with your camera to avoid typing your recovery
            phrase.
          </p>

          <p>
            <button className="button primary" onClick={this.handleScanQRCode}>Scan QR Code</button>
          </p>
        </div>
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

  render() {
    const {screen, publicKey, privateKey, mnemonic, currentLanguage} = this.state;

    switch (screen) {
      case "restore-from-mnemonic":
        return <RestoreFromMnemonic language={currentLanguage} goToScreen={this.goToScreen} />;

      case "input-words":
        return <InputWords language={currentLanguage} goToScreen={this.goToScreen} />;

      case "scan-qrcode":
        return <ScanQRCode goToScreen={this.goToScreen} />;

      case "show-words":
        return <MnemonicPrintSheet goToScreen={this.goToScreen} mnemonic={mnemonic} privateKey={privateKey} />;

      case "confirm-words":
      case "print-public-key":
        return <PublicKeyPrintSheet goToScreen={this.goToScreen} publicKey={publicKey} />;

      case "show-private-key":
        return <ShowPrivateKey privateKey={privateKey} goToScreen={this.goToScreen} />;

      case "finish":
        return this.finishScreen();

      case "splash":
        return this.splashScreen();
    }
  }
}
