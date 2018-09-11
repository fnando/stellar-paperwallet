import React from "react";
import PropTypes from "prop-types";

import isLastItem from "../utils/isLastItem";

export default class ConfirmWords extends React.Component {
  state = {
    confirmedMnemonic: [],
    index: 0,
    randomMnemonic: null,
    screen: "confirm-word"
  };

  static propTypes = {
    goToScreen: PropTypes.func.isRequired,
    mnemonic: PropTypes.array.isRequired
  };

  static getDerivedStateFromProps(props, state) {
    if (!state.randomMnemonic) {
      const mnemonic = props.mnemonic.map((word, index) => ({word, index}));
      const randomMnemonic = mnemonic.slice(0);
      randomMnemonic.sort(() => Math.random());
      state = {...state, mnemonic, randomMnemonic};
    }

    return state;
  };

  handleNext = () => {
    this.setState({screen: "confirmation-complete"});
  };

  handleClearWords = () => {
    this.setState({confirmedMnemonic: []});
  };

  validMnemonicConfirmation() {
    const {mnemonic, confirmedMnemonic} = this.state;

    const recoveryPhrase = mnemonic.map(({word}) => word).join(" ");
    const confirmedRecoveryPhrase = confirmedMnemonic.map(({word}) => word).join(" ");

    return recoveryPhrase === confirmedRecoveryPhrase;
  }

  confirmWordScreen() {
    const {mnemonic, randomMnemonic, confirmedMnemonic} = this.state;
    const indexesInUse = confirmedMnemonic.map(({index}) => index);
    const mnemonicMatches = this.validMnemonicConfirmation();

    return (
      <div className="center">
        <h1>Let's verify your recovery phrase.</h1>
        <h2>Please select each word in the correct order.</h2>

        <div className="word-panel available-words">
          <div>
            {randomMnemonic.map(item => <button disabled={indexesInUse.includes(item.index)} className="word-button" onClick={() => this.handleAddWord(item)} key={item.index}>{item.word}</button>)}
          </div>
        </div>

        <div className="word-panel confirmed-words">
          <div>
            {confirmedMnemonic.map(item => <button className="word-button" onClick={() => this.handleRemoveWord(item)} key={item.index}>{item.word}</button>)}
          </div>
        </div>

        <p className="submit-wrapper">
          <button className="button secondary" onClick={this.handleClearWords}>Clear Words</button>
          <button className="button primary" disabled={!mnemonicMatches} onClick={this.handleNext}>Continue</button>
        </p>
      </div>
    );
  }

  handleAddWord = (item) => {
    const {confirmedMnemonic} = this.state;
    confirmedMnemonic.push(item);
    this.setState({confirmedMnemonic});
  };

  handleRemoveWord = (item) => {
    let {confirmedMnemonic} = this.state;
    confirmedMnemonic = confirmedMnemonic.filter(({index}) => index !== item.index);
    this.setState({confirmedMnemonic});
  };

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
