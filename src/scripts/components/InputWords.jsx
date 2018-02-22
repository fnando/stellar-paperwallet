import React from "react";
import PropTypes from "prop-types";
import StellarHDWallet from "stellar-hd-wallet";

import InputWord from "./InputWord";
import WalletRestored from "./WalletRestored";
import {isValidMnemonic, mnemonicJoin} from "../utils/bip39Utils";

export default class InputWords extends React.Component {
  state = {
    screen: "retrieve-words",
    mnemonic: [],
    index: 0
  };

  static propTypes = {
    language: PropTypes.string.isRequired,
    goToScreen: PropTypes.func.isRequired
  };

  handleNext = word => {
    let {mnemonic, index} = this.state;
    const {language} = this.props;

    mnemonic[index] = word;

    if (index < 23) {
      index += 1;
      this.setState({mnemonic, index});
      return;
    }

    index = 0;

    if (isValidMnemonic(language, mnemonic)) {
      const wallet = StellarHDWallet.fromMnemonic(mnemonicJoin(language, mnemonic));
      const privateKey = wallet.getSecret(0);
      const publicKey = wallet.getPublicKey(0);

      this.setState({mnemonic, index, publicKey, privateKey, screen: "confirmation"});
    } else {
      this.setState({mnemonic, index, screen: "invalid-mnemonic"});
    }
  };

  handlePrevious = () => {
    let {index} = this.state;

    index -= 1;

    this.setState({index});
  };

  handleReviewRecoveryPhrase = () => {
    this.setState({screen: "retrieve-words"});
  };

  retrieveWordsScreen() {
    const {mnemonic, index} = this.state;
    const {language} = this.props;
    const word = mnemonic[index] || "";

    return (
      <div className="center">
        <h1>Restoring your wallet</h1>
        <InputWord
          key={index}
          value={word}
          index={index}
          onNext={this.handleNext}
          onPrevious={this.handlePrevious}
          language={language} />
      </div>
    );
  }

  invalidMnemonicScreen() {
    return (
      <div className="center">
        <h1>Invalid recovery phrase</h1>
        <p>
          Looks like your informed an invalid recovery phrase.
        </p>

        <p className="submit-wrapper">
          <button onClick={this.handleReviewRecoveryPhrase} className="button primary">Review recovery phrase</button>
        </p>
      </div>
    );
  }

  render() {
    const {screen, publicKey, privateKey, mnemonic} = this.state;
    const {goToScreen} = this.props;

    switch (screen) {
      case "retrieve-words":
        return this.retrieveWordsScreen();
      case "confirmation":
        return <WalletRestored mnemonic={mnemonic} privateKey={privateKey} publicKey={publicKey} goToScreen={goToScreen} />;
      case "invalid-mnemonic":
        return this.invalidMnemonicScreen();
    }
  }
}
