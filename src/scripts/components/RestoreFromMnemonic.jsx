import React from "react";
import PropTypes from "prop-types";

import LanguageButtons from "./LanguageButtons";

export default class RestoreFromMnemonic extends React.Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    goToScreen: PropTypes.func.isRequired
  };

  handleLanguageChange = language => {
    const {goToScreen} = this.props;
    goToScreen("restore-from-mnemonic", {currentLanguage: language});
  };

  handleContinue = () => {
    const {goToScreen} = this.props;
    goToScreen("input-words");
  };

  render() {
    const {language} = this.props;

    return (
      <div className="center">
        <h1 className="hide-on-print">Restore your wallet</h1>

        <p>
          You'll be asked to inform 24 words.
        </p>

        <h2 className="mt3 mb0">Select language</h2>

        <p>
          You can select the language for your recovery phrase.
        </p>

        <div>
          <LanguageButtons language={language} onClick={this.handleLanguageChange} />
        </div>

        <p className="submit-wrapper">
          <button className="button primary" onClick={this.handleContinue}>Continue</button>
        </p>
      </div>
    );
  }
}
