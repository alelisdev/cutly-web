import React from "react";
import { Link } from "react-router-dom";

/**
 *  Navigation header
 */
export class NavigationHeader extends React.PureComponent {
  render() {
    return (
      <Link to="/" className="text-decoration-none navbar-brand text-left">
        <div className="d-flex align-items-center py-3">
          <span className="font-sans-serif">Cutly</span>
        </div>
      </Link>
    );
  }
}