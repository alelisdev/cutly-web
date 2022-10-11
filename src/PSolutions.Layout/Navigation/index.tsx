import React from "react";
import { IntlContext } from "react-intl";
import { Nav, Navbar } from "react-bootstrap";
import { NavSeparator } from "./NavSeparator";
import { NavbarToggle } from "./NavbarToggle";
import { NavigationItem } from "./NavigationItem";
import { NavigationHeader } from "./NavigationHeader";

interface Props {
  expanded: boolean;

  onItemClick(): void;
}

export class MainNavigation extends React.PureComponent<Props> {
  static contextType = IntlContext;
  context!: React.ContextType<typeof IntlContext>;

  render() {
    const {expanded} = this.props;
    const homeTitle = this.context.formatMessage({id: "generic.messages.home"});
    const stuffTitle = this.context.formatMessage({id: "generic.messages.stuff"});
    const settingsTitle = this.context.formatMessage({id: "generic.messages.settings"});
    const servicesTitle = this.context.formatMessage({id: "generic.messages.services"});
    const locationsTitle = this.context.formatMessage({id: "generic.messages.locations"});
    const employeesTitle = this.context.formatMessage({id: "generic.messages.employees"});
    const bookingSettingsTitle = this.context.formatMessage({id: "generic.messages.booking.settings"});
    const clientsTitle = this.context.formatMessage({id: "generic.messages.clients"});
    return (
      <Navbar className="navbar-vertical" variant="light" expand="xl" expanded={expanded}>
        <div className="d-flex align-items-center">
          <NavbarToggle/>
          <NavigationHeader/>
        </div>
        <Navbar.Collapse id="responsive-navbar-nav">
          <div className="navbar-vertical-content scrollbar vh-100">
            <Nav className="flex-column" as="ul">
              <NavigationItem icon="home" label={homeTitle} navigateTo="/" onClick={this.props.onItemClick}/>
              <NavSeparator label={stuffTitle}/>
              <NavigationItem icon="users" label={employeesTitle} navigateTo="/Employees" onClick={this.props.onItemClick}/>
              <NavigationItem icon="users" label={clientsTitle} navigateTo="/Clients" onClick={this.props.onItemClick}/>
              <NavSeparator label={settingsTitle}/>
              <NavigationItem icon="hand-holding-hand" label={servicesTitle} navigateTo="/Services" onClick={this.props.onItemClick}/>
              <NavigationItem icon="building" label={locationsTitle} navigateTo="/Locations" onClick={this.props.onItemClick}/>
              <NavigationItem icon="cog" label={bookingSettingsTitle} navigateTo="/BookingSettings" onClick={this.props.onItemClick}/>
            </Nav>
          </div>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}