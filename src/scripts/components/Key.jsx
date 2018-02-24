import React from "react";
import PropTypes from "prop-types";

const SLOTS = {
  2: /^(.{28})(.{28})$/,
  4: /^(.{14})(.{14})(.{14})(.{14})$/
};

export default class Key extends React.Component {
  static propTypes = {
    slots: PropTypes.number,
    value: PropTypes.string.isRequired
  };

  static defaultProps = {
    slots: 2
  };

  render() {
    const {value, slots} = this.props;
    const segments = value.match(SLOTS[slots]).slice(1);
    const elements = segments.reduce((buffer, segment) => {
      buffer.push(segment, <wbr key={segment}/>);
      return buffer;
    }, []);


    return (
      <code className="black">
        {elements}
      </code>
    );
  }
}
