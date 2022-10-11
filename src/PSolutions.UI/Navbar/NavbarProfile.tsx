import React from "react";
import Avatar from 'react-avatar';
import { connect } from "react-redux";
import { IntlContext } from "react-intl";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import styles from './navbar.module.css';
import { IRootState } from "../../PSolutions.State";
import { bindActionCreators, Dispatch } from "redux";
import { signOut } from "../../PSolutions.App/Redux/Actions";
import { removeCurrentLocation } from "../../PSolutions.Containers/Location/Redux/Actions";

interface Props {
  lastName: string;
  firstName: string;
  profilePhoto: string;

  signOut(): void;

  removeCurrentLocation(): any;
}

class NavbarProfile extends React.PureComponent<Props> {
  static contextType = IntlContext;
  context!: React.ContextType<typeof IntlContext>;

  constructor(props: Props) {
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut() {
    this.props.signOut();
    this.props.removeCurrentLocation();
  }

  render() {
    const name = `${this.props.firstName} ${this.props.lastName}`;
    const logout = this.context.formatMessage({id: "generic.messages.logout"});
    return (
      <Dropdown navbar as="li">
        <Dropdown.Toggle bsPrefix="toggle" as={Link} to="#!" className="pe-0 ps-2 nav-link">
          <span className="avatar-margin pe-2">{name}</span>
          <Avatar size="35" round name={name} className={styles.avatar}/>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu-card dropdown-menu-end">
          <div className="bg-white rounded-2 py-2 dark__bg-1000">
            <Dropdown.Item as={Link} to="/" onClick={this.handleSignOut}>{logout}</Dropdown.Item>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

const mapStateToProps = (state: IRootState) => {
  return {
    lastName: state.app.lastName,
    firstName: state.app.firstName,
    profilePhoto: state.app.profilePhoto,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({signOut, removeCurrentLocation}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarProfile);