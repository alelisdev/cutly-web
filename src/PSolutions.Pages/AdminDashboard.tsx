import React from "react";
import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { MainContent } from "../PSolutions.Layout/Content";
import { MainNavigation } from "../PSolutions.Layout/Navigation";
import { MainNavigationBar } from "../PSolutions.Layout/Navbar";
import NavbarProfile from "../PSolutions.UI/Navbar/NavbarProfile";
import { LocationProvider } from "../PSolutions.Providers/Location/LocationProvider";
import LocationsContainer from "../PSolutions.Containers/Locations/Container/LocationsContainer";
import { CalendarContainer } from "../PSolutions.Containers/Calendar/Container/CalendarContainer";
import EmployeeListContainer from "../PSolutions.Containers/Employees/Container/EmployeeListContainer";
import LocationUpsertContainer from "../PSolutions.Containers/Locations/Container/LocationUpsertContainer";
import EmployeeUpsertContainer from "../PSolutions.Containers/Employees/Container/EmployeeUpsertContainer";
import BookingSettingsContainer from "../PSolutions.Containers/BookingSettings/Container/BookingSettingsContainer";
import ServicesListContainer from "../PSolutions.Containers/Services/Container/ServicesListContainer";
import ServiceUpsertContainer from "../PSolutions.Containers/Services/Container/ServiceUpsertContainer";
import CategoryUpsertContainer from "../PSolutions.Containers/Category/Container/CategoryUpsertContainer";
import ClientListContainer from "../PSolutions.Containers/Clients/Container/ClientListContainer";

interface Props {
  show: boolean;
}

interface State {
  expanded: boolean;
}

export class AdminDashboard extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {expanded: false}
    this.closeMenu = this.closeMenu.bind(this);
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
  }

  closeMenu() {
    this.setState({expanded: false});
  }

  toggleMobileMenu() {
    this.setState({expanded: !this.state.expanded})
  }

  render() {
    const {expanded} = this.state;
    if (!this.props.show) return null;
    return (
      <LocationProvider>
        <Container fluid>
          <MainNavigation expanded={expanded} onItemClick={this.closeMenu}/>
          <MainContent>
            <MainNavigationBar toggle={this.toggleMobileMenu}>
              <NavbarProfile/>
            </MainNavigationBar>
            <Routes>
              <Route path="/" element={<CalendarContainer/>}/>
              <Route path="/Locations">
                <Route index element={<LocationsContainer/>}/>
                <Route path="Upsert" element={<LocationUpsertContainer/>}/>
                <Route path="Upsert/:id" element={<LocationUpsertContainer/>}/>
              </Route>
              <Route path="/Services">
                <Route index element={<ServicesListContainer/>}/>
                <Route path="Category/Upsert" element={<CategoryUpsertContainer/>}/>
                <Route path="Category/Upsert/:id" element={<CategoryUpsertContainer/>}/>
                <Route path="Upsert/" element={<ServiceUpsertContainer/>}/>
                <Route path="Upsert/:id" element={<ServiceUpsertContainer/>}/>
              </Route>
              <Route path="/Employees">
                <Route index element={<EmployeeListContainer/>}/>
                <Route path="Upsert/" element={<EmployeeUpsertContainer/>}/>
                <Route path="Upsert/:id" element={<EmployeeUpsertContainer/>}/>
              </Route>
              <Route path="/Clients">
                <Route index element={<ClientListContainer/>}/>
                <Route path="Upsert/" element={<EmployeeUpsertContainer/>}/>
                <Route path="Upsert/:id" element={<EmployeeUpsertContainer/>}/>
              </Route>
              <Route path="/BookingSettings" element={<BookingSettingsContainer/>}/>
            </Routes>
          </MainContent>
        </Container>
      </LocationProvider>
    );
  }
}