import React from "react";
import PropTypes from "prop-types";

export default class Key extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired
  }

  render() {
    const {value} = this.props;
    const matches = value.match(/^(.{28})(.{28})$/);

    return (
      <code className="black">
        {matches[1]}<wbr/>
        {matches[2]}
      </code>
    );
  }
}
