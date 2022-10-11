import React from "react";
import { connect } from "react-redux";
import { Formik, FormikHelpers } from "formik";
import { bindActionCreators, Dispatch } from "redux";
import { BookingSchema } from "./BookingSchema";
import { IRootState } from "../../../PSolutions.State";
import { BookingSettingsView } from "../Views/BookingSettingsView";
import { IBookingSettings, IBookingSettingsRequest } from "../Types";
import { withNavigation } from "../../../PSolutions.Providers/Navigation";
import { updateBookingSettingsAsync, clearState, getBookingSettingsAsync } from "../Redux/Actions";
import { BusyIndicator } from "../../../PSolutions.UI/Loaders/BusyIndicator";

interface Props {
  isBusy: boolean;
  locationId: number;
  settings: IBookingSettings,

  clearState(): void;

  navigate(to: any): void;

  getBookingSettingsAsync(officeId: number): any;

  updateBookingSettingsAsync(request: IBookingSettingsRequest): any;
}

class LocationUpsertContainer extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.fetchAsync = this.fetchAsync.bind(this);
    this.submitAsync = this.submitAsync.bind(this);
  }

  async fetchAsync() {
    await this.props.getBookingSettingsAsync(this.props.locationId);
  }

  async componentDidMount() {
    await this.fetchAsync();
  }

  componentWillUnmount() {
    this.props.clearState();
  }

  async submitAsync(values: IBookingSettings, actions: FormikHelpers<any>) {
    const res = await this.props.updateBookingSettingsAsync(values);
    actions.setSubmitting(false);
    if (!!res) await this.fetchAsync();
  }

  render() {
    return (
      <React.Fragment>
        <BusyIndicator show={this.props.isBusy}/>
        <Formik enableReinitialize={true} onSubmit={this.submitAsync} component={BookingSettingsView} validationSchema={BookingSchema} initialValues={this.props.settings}/>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: IRootState) => {
  return {
    isBusy: state.bookingSettings.isBusy,
    settings: state.bookingSettings.settings,
    showError: state.bookingSettings.showError,
    locationId: state.currentLocation.locationId,
    errorMessage: state.bookingSettings.errorMessage,
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({clearState, updateBookingSettingsAsync, getBookingSettingsAsync}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(LocationUpsertContainer));