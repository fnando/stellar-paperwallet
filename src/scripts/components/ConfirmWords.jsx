import React from "react";
import PropTypes from "prop-types";

import ConfirmWord from "./ConfirmWord";
import isLastItem from "../utils/isLastItem";

export default class ConfirmWords extends React.Component {
  state = {
    index: 0,
    screen: "confirm-word"
  };

  static propTypes = {
    goToScreen: PropTypes.func.isRequired,
    mnemonic: PropTypes.array.isRequired
  };

  handleConfirmation = () => {
    let {index} = this.state;
    const {mnemonic} = this.props;

    if (isLastItem(mnemonic, index)) {
      this.setState({screen: "confirmation-complete"});
    } else {
      index += 1;
      this.setState({index});
    }
  }

  confirmWordScreen() {
    const {mnemonic} = this.props;
    const {index} = this.state;
    const word = mnemonic[index];

    return <ConfirmWord word={word} index={index} onConfirmation={this.handleConfirmation} />;
  }

  handlePrintPublicKey = () => {
    const {goToScreen} = this.props;
    goToScreen("print-public-key");
  };

  confirmationCompleteScreen() {
    return (
      <div className="center">
        <h1>Your recovery phrase matched!</h1>
        <p>
          Now you can print your public address, which you'll use to
          transfer lumens to it.
        </p>

        <p className="submit-wrapper">
          <button onClick={this.handlePrintPublicKey} className="button primary">Print my public key</button>
        </p>
      </div>
    );
  }

  render() {
    const {screen} = this.state;

    switch (screen) {
      case "confirm-word": return this.confirmWordScreen();
      case "confirmation-complete": return this.confirmationCompleteScreen();
    }
  }
}
