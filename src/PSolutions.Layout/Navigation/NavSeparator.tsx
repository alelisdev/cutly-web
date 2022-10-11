import React from "react";
import { Col, Nav, Row } from "react-bootstrap";

interface Props {
  label: string;
}

export class NavSeparator extends React.PureComponent<Props> {
  render() {
    return (
      <Nav.Item as="li">
        <Row className="mt-3 mb-2 navbar-vertical-label-wrapper">
          <Col xs="auto" className="navbar-vertical-label navbar-vertical-label">{this.props.label}</Col>
          <Col className="ps-0"><hr className="mb-0 navbar-vertical-divider"/></Col>
        </Row>
      </Nav.Item>
    );
  }
}