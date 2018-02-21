import React from "react";
import PropTypes from "prop-types";

export default class Key extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired
  }

  render() {
    const {value} = this.props;
    const matches = value.match(/^(.{14})(.{14})(.{14})(.{14})$/);

    return (
      <code className="black">
        {matches[1]}<wbr/>
        {matches[2]}<wbr/>
        {matches[3]}<wbr/>
        {matches[4]}
      </code>
    );
  }
}
