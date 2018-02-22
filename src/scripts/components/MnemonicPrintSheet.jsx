import React from "react";
import PropTypes from "prop-types";
import QRCode from "qrcode.react";
import chunk from "lodash/chunk";

import PrintButton from "./PrintButton";

export default class MnemonicPrintSheet extends React.Component {
  state = {
    index: 0
  };

  static propTypes = {
    goToScreen: PropTypes.func.isRequired,
    mnemonic: PropTypes.array.isRequired,
    onRefreshMnemonic: PropTypes.func,
    privateKey: PropTypes.string.isRequired
  };

  handlePrevious = () => {
    let {index} = this.state;
    index -= 1;
    this.setState({index});
  };

  handleNext = () => {
    let {index} = this.state;
    const {goToScreen, mnemonic} = this.props;
    const lastWord = index === mnemonic.length - 1;

    if (lastWord) {
      goToScreen("confirm-words");
    } else {
      index += 1;
      this.setState({index});
    }
  };

  renderWords() {
    const {mnemonic} = this.props;
    let position = 0;

    const result = chunk(mnemonic, 8).map((group, groupIndex) => {
      const items = group.map(item => {
        position += 1;

        return (
          <div className="column-item" key={position}>
            <span className="number">{position}.</span>
            <code className="word">{item}</code>
          </div>
        );
      });

      return <div key={`column-${groupIndex}`} className="column">{items}</div>;
    });

    return result;
  }

  handleConfirmWords = () => {
    const {goToScreen} = this.props;
    goToScreen("confirm-words");
  };

  render() {
    const {privateKey, onRefreshMnemonic} = this.props;

    return (
      <div className="print-sheet mnemonic-print-sheet center">
        <h1 className="hide-on-print">Recovery Phrase</h1>
        <p className="hide-on-print">
          The recovery phrase is how you can restore your private key
          (the really important secret that must be kept as secure as possible).
        </p>

        <h2 className="show-on-print">My Recovery Phrase</h2>

        <div className="word-list small-on-print">
          {this.renderWords()}
        </div>

        <p className="qrcode show-on-print">
          <QRCode value={privateKey} size={132} />
        </p>

        <p className="show-on-print warning-message">
          Store this document in a safe place
        </p>

        <p className="hide-on-print submit-wrapper">
          <PrintButton />
          {onRefreshMnemonic && <button className="button secondary" onClick={onRefreshMnemonic}>Refresh list</button>}
          <button className="button primary" onClick={this.handleConfirmWords}>I wrote this list down</button>
        </p>
      </div>
    );
  }
}
