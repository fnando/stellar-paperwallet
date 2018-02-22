import React from "react";
import PropTypes from "prop-types";

import englishFlag from "../../images/flags/english.svg";
import spanishFlag from "../../images/flags/spanish.svg";
import frenchFlag from "../../images/flags/french.svg";
import italianFlag from "../../images/flags/italian.svg";
import japaneseFlag from "../../images/flags/japanese.svg";
import koreanFlag from "../../images/flags/korean.svg";
import chineseFlag from "../../images/flags/chinese.svg";

const LANGUAGES = {
  english: "English",
  spanish: "Español",
  french: "Français",
  italian: "Italiano",
  japanese: "日本語",
  korean: "한국어",
  chinese_simplified: "中文(简体)",
  chinese_traditional: "中文(繁體)"
};

const FLAGS = {
  english: englishFlag,
  spanish: spanishFlag,
  french: frenchFlag,
  italian: italianFlag,
  japanese: japaneseFlag,
  korean: koreanFlag,
  chinese_simplified: chineseFlag,
  chinese_traditional: chineseFlag
};

export default class LanguageButtons extends React.Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  };

  handleClick = event => {
    const {onClick} = this.props;
    onClick(event.currentTarget.dataset.language);
  };

  render() {
    const currentLanguage = this.props.language;

    return Object.keys(LANGUAGES).map(language => {
      const label = LANGUAGES[language];
      const className = `flag-button ${currentLanguage === language ? "selected" : null}`;

      return (
        <button onClick={this.handleClick} className={className} key={language} data-language={language}>
          <img src={FLAGS[language]} alt={label} />
          {label}
        </button>
      );
    });
  }
}
