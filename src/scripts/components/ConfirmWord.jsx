import React from "react";
import PropTypes from "prop-types";

const ENTER = 13;

export default class ConfirmWord extends React.Component {
  state = {
    confirmingWord: null,
    validConfirmation: false
  }

  static propTypes = {
    index: PropTypes.number.isRequired,
    onConfirmation: PropTypes.func.isRequired,
    word: PropTypes.string.isRequired
  };

  handleOnChange = event => {
    const confirmingWord = event.target.value;
    const {word} = this.props;
    const validConfirmation = confirmingWord === word;

    this.setState({confirmingWord, validConfirmation});
  }

  handleNext = () => {
    let {validConfirmation, confirmingWord} = this.state;
    const {onConfirmation} = this.props;

    if (validConfirmation) {
      validConfirmation = false;
      confirmingWord = null;
      this.input.value = "";
      onConfirmation();
    }

    this.setState({validConfirmation, confirmingWord});
    this.input.focus();
  }

  handleKeyUp = event => {
    if (event.keyCode === ENTER) {
      this.handleNext();
    }
  };

  render() {
    const {index} = this.props;
    const {validConfirmation} = this.state;
    const number = index + 1;
    const disableNext = !validConfirmation;

    return (
      <div className="center">
        <h1>Confirming your recovery phrase</h1>
        <h2>What's the word #{number}?</h2>

        <input
          autoFocus
          ref={input => this.input = input}
          className="center"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          onChange={this.handleOnChange}
          onKeyUp={this.handleKeyUp} />

        <p className="submit-wrapper">
          <button className="button primary" disabled={disableNext} onClick={this.handleNext}>Next</button>
        </p>
      </div>
    );
  }
}
