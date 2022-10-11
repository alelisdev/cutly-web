import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  icon: any;
  label: string;
  navigateTo: string;

  onClick(): void;
}

export class NavigationItem extends React.PureComponent<Props> {
  render() {
    const {onClick, navigateTo} = this.props;
    return (
      <Nav.Item as="li" className="nav-link cursor">
        <NavLink to={navigateTo} className="nav-link" onClick={onClick}>
          <div className="d-flex align-items-center">
            <span className="nav-link-icon"><FontAwesomeIcon icon={this.props.icon}/></span>
            <span className="nav-link-text ps-1">{this.props.label}</span>
          </div>
        </NavLink>
      </Nav.Item>
    );
  }
}