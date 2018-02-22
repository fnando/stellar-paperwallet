import React from "react";
import PropTypes from "prop-types";

import {isValidDictionaryEntry} from "../utils/bip39Utils";

const ENTER = 13;

export default class InputWord extends React.Component {
  state = {
    value: ""
  };

  static propTypes = {
    index: PropTypes.number.isRequired,
    language: PropTypes.string.isRequired,
    onNext: PropTypes.func.isRequired,
    onPrevious: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    const {value} = props;
    this.state = {value};
  }

  handlePrevious = () => {
    const {onPrevious} = this.props;
    onPrevious();
  };

  handleNext = () => {
    const {value} = this.state;
    const {onNext, language} = this.props;

    if (isValidDictionaryEntry(language, value)) {
      onNext(value);
    }
  };

  handleOnChange = event => {
    const value = event.target.value.trim().toLowerCase();
    this.setState({value});
  };

  handleKeyUp = event => {
    if (event.keyCode === ENTER) {
      this.handleNext();
    }
  };

  render() {
    const {value} = this.state;
    const {index, language} = this.props;
    const position = index + 1;
    const disablePrevious = index === 0;
    const disableNext = !isValidDictionaryEntry(language, value);

    return (
      <div>
        <h2>What's the word #{position}?</h2>

        <p>
          <input
            ref={input => this.input = input}
            value={value}
            onKeyUp={this.handleKeyUp}
            onChange={this.handleOnChange}
            className="center" autoFocus />
        </p>

        <p className="submit-wrapper center">
          <button disabled={disablePrevious} onClick={this.handlePrevious} className="button secondary">Previous</button>
          <button disabled={disableNext} onClick={this.handleNext} className="button primary">Next</button>
        </p>
      </div>
    );
  }
}
