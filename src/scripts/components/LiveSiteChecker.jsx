import React from "react";

import pkg from "../../../package.json";

export default class LiveSiteChecker extends React.Component {
  state = {
    dismissed: false
  };

  handleDismiss = () => {
    this.setState({dismissed: true});
  };

  render() {
    const {dismissed} = this.state;
    const runningLive = !!location.protocol.match(/^https?:/);
    const url = `https://github.com/fnando/stellar-paperwallet/releases/download/v${pkg.version}/stellar-paperwallet.zip`;
    const skipRendering = dismissed || !runningLive;

    if (skipRendering) {
      return null;
    }

    return (
      <div className="live-site center hide-on-print">
        <div>
          <div>
            You're running this paper wallet generator off of a live website.
            Even though all code runs on the client-side, is recommended that
            you <a href={url}>download the zip file</a> and run it locally from your machine.
          </div>
          <p className="mb0">
            <button onClick={this.handleDismiss}>Dismiss</button>
          </p>
        </div>
      </div>
    );
  }
}
