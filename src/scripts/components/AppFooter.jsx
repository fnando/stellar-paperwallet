import React from "react";

import pkg from "../../../package.json";
import Key from "./Key";

export default class AppFooter extends React.Component {
  render() {
    return (
      <section className="donation hide-on-print">
        <p>
          Please consider giving a donation if you can.
        </p>

        <p className="wallet-address">
          <Key value="GDGBXOPPXJZH3JVKIBK6Z4RNSAZ4QNLQVAB3JYBU3K3BCR4NEFVNANDO" />
        </p>

        <p className="center">
          <a href="https://github.com/fnando/stellar-paperwallet">{pkg.name}</a> v{pkg.version}
        </p>
      </section>
    );
  }
}
