import React from "react";
import { Button } from 'react-bootstrap';

export class NavbarToggle extends React.PureComponent {
  render() {
    return (
      <div className="toggle-icon-wrapper">
        <Button variant="link" className="navbar-toggler-humburger-icon navbar-vertical-toggle">
          <span className="navbar-toggle-icon"><span className="toggle-line"/></span>
        </Button>
      </div>
    );
  }
}