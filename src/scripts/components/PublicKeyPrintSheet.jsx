import React from "react";
import PropTypes from "prop-types";
import QRCode from "qrcode.react";
import times from "lodash/times";

import PrintButton from "./PrintButton";
import Key from "./Key";
import logo from "../../images/logo-print-horizontal.svg";

export default class PublicKeyPrintSheet extends React.Component {
  static propTypes = {
    goToScreen: PropTypes.func.isRequired,
    publicKey: PropTypes.string.isRequired
  };

  handleContinue = () => {
    const {goToScreen} = this.props;
    goToScreen("show-private-key");
  };

  printingCard = index => {
    const {publicKey} = this.props;

    return (
      <div key={index} className="print-sheet public-key-print-sheet">
        <header className="show-on-print">
          <img className="logo" src={logo} alt="" />
        </header>

        <div className="memo">
          <strong>MEMO</strong>
        </div>

        <p className="mb0">
          <Key slots={4} value={publicKey} />
        </p>

        <p className="qrcode">
          <QRCode value={publicKey} size={130} />
        </p>
      </div>
    );
  };

  render() {
    const {publicKey} = this.props;
    const printingCards = times(6, this.printingCard);

    return (
      <div>
        <p className="show-on-print center">
          Print this in Letter or A4 paper in landscape orientation.
          <br/>
          You can safely share this address.
        </p>

        <div className="center-on-screen hide-on-print">
          <h1 className="hide-on-print">Your public key</h1>
          <p>
            This is your public address. You can pass it
            to other people, so that they can transfer
            lumens to your account.
          </p>

          <p className="mb0">
            <Key value={publicKey} />
          </p>

          <p className="qrcode">
            <QRCode value={publicKey} />
          </p>

          <p className="hide-on-print submit-wrapper center">
            <PrintButton />
            <button className="button primary" onClick={this.handleContinue}>Continue</button>
          </p>
        </div>

        <div className="printable-cards show-on-print">
          {printingCards}
        </div>
      </div>
    );
  }
}
