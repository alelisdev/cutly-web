import React from "react";
import { Row } from "react-bootstrap";

export class PSFormRow extends React.PureComponent {
  render() {
    return <Row className="mb-3 g-3">{this.props.children}</Row>;
  }
}