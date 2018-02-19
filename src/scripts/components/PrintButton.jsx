import React from "react";

export default class PrintButton extends React.Component {
  handlePrint = () => {
    window.print();
  };

  render() {
    return <button className="button secondary" onClick={this.handlePrint}>Print</button>;
  }
}
