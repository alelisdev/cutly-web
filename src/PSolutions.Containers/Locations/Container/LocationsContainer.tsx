import React from "react";
import { connect } from "react-redux";
import { IntlContext } from "react-intl";
import { Card, Row } from "react-bootstrap";
import { bindActionCreators, Dispatch } from "redux";
import { ILocation, ILocationProps } from "../Types";
import LocationItem from "../Components/LocationItem";
import { IRootState } from "../../../PSolutions.State";
import LocationHeader from "../Components/LocationHeader";
import { clearState, getLocationsAsync } from "../Redux/Actions";
import { setCurrentLocation } from "../../Location/Redux/Actions";
import { MainCard } from "../../../PSolutions.Layout/Card/MainCard";
import { BusyIndicator } from "../../../PSolutions.UI/Loaders/BusyIndicator";

interface Props extends ILocationProps {
  currentLocationId: number;

  clearState(): void;

  getLocationsAsync(): any;

  setCurrentLocation(location: ILocation): void;
}

class LocationsContainer extends React.PureComponent<Props> {
  static contextType = IntlContext;
  context!: React.ContextType<typeof IntlContext>;

  componentWillUnmount() {
    this.props.clearState();
  }

  async componentDidMount() {
    const {currentLocationId} = this.props;
    const locations = await this.props.getLocationsAsync();
    if (!!locations && !currentLocationId) this.props.setCurrentLocation(locations[0])
  }

  render() {
    const {data, isBusy, currentLocationId, setCurrentLocation} = this.props;
    return (
      <MainCard>
        <LocationHeader/>
        <Card.Body className="bg-light">
          <BusyIndicator show={isBusy}/>
          <Row className="g-0">
            {data.map((l: ILocation) => <LocationItem key={l.providerId} location={l} onClick={setCurrentLocation} selectedLocationId={currentLocationId}/>)}
          </Row>
        </Card.Body>
      </MainCard>
    );
  }
}

const mapStateToProps = (state: IRootState) => {
  return {
    page: state.locations.page,
    data: state.locations.data,
    isBusy: state.locations.isBusy,
    hasMore: state.locations.hasMore,
    nextPage: state.locations.nextPage,
    pageSize: state.locations.pageSize,
    showError: state.locations.showError,
    totalCount: state.locations.totalCount,
    errorMessage: state.locations.errorMessage,
    selectedItem: state.locations.selectedItem,
    locationRequest: state.locations.locationRequest,
    currentLocationId: state.currentLocation.locationId,
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({getLocationsAsync, setCurrentLocation, clearState}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationsContainer);