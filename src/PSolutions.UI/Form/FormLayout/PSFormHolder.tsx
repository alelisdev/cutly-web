import React from "react";
import { Row } from "react-bootstrap";

export class PSFormHolder extends React.PureComponent {
  render() {
    return <Row className="g-3">{this.props.children}</Row>;
  }
}