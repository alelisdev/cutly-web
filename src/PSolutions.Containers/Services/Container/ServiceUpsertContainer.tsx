import React from "react";
import { connect } from "react-redux";
import { IntlContext } from "react-intl";
import { Params } from "react-router-dom";
import { Formik, FormikHelpers } from "formik";
import { bindActionCreators, Dispatch } from "redux";
import { IService } from "../Types";
import { ServiceValidationSchema } from "./ServiceValidationSchema";
import { IRootState } from "../../../PSolutions.State";
import { ServiceUpsertView } from "../Views/ServiceUpsertView";
import { getEmployeesAsync } from "../../Employees/Redux/Actions";
import { BusyIndicator } from "../../../PSolutions.UI/Loaders/BusyIndicator";
import { withNavigation, withParams } from "../../../PSolutions.Providers/Navigation";
import { addServiceAsync, clearError, clearState, getServiceAsync, updateServiceAsync } from "../Redux/Actions";

interface Props {
  isBusy: boolean;
  locationId: number;
  service: IService
  params: Readonly<Params>;

  clearState(): void;

  clearError(): void;

  navigate(to: any, options?: any): void;

  getEmployeesAsync(locationId: number): any;

  getServiceAsync(serviceId: string): void;

  addServiceAsync(service: IService): any;

  updateServiceAsync(service: IService): any;
}

interface State {
  isEdit: boolean;
}

class ServiceUpsertContainer extends React.PureComponent<Props, State> {
  static contextType = IntlContext;
  context!: React.ContextType<typeof IntlContext>;

  constructor(props: Props) {
    super(props);
    this.state = {isEdit: true};
    this.submitAsync = this.submitAsync.bind(this);
    this.handleAddAsync = this.handleAddAsync.bind(this);
    this.handleUpdateAsync = this.handleUpdateAsync.bind(this);
  }

  componentWillUnmount() {
    this.props.clearState();
  }

  async componentDidMount() {
    const id = this.props.params.id || 0;
    await this.props.getEmployeesAsync(this.props.locationId);

    if (!!id) await this.props.getServiceAsync(id);
    else this.setState({isEdit: false});
  }

  async handleUpdateAsync(values: IService, actions: FormikHelpers<IService>) {
    const entityUpdated = await this.props.updateServiceAsync(values);
    if (!!entityUpdated) this.props.navigate(-1);
    else actions.setSubmitting(false);
  }

  async handleAddAsync(values: IService, actions: FormikHelpers<IService>) {
    const entityAdded = await this.props.addServiceAsync(values);
    if (!!entityAdded) this.props.navigate(-1);
    else actions.setSubmitting(false);
  }

  async submitAsync(values: IService, formikActions: FormikHelpers<IService>) {
    if (!values.branchOfficeId) values.branchOfficeId = this.props.locationId;
    if (this.state.isEdit) return this.handleUpdateAsync(values, formikActions);
    else return this.handleAddAsync(values, formikActions);
  }

  render() {
    return (
      <React.Fragment>
        <BusyIndicator show={this.props.isBusy}/>
        <Formik
          validateOnChange={true}
          enableReinitialize={true}
          onSubmit={this.submitAsync}
          component={ServiceUpsertView}
          validationSchema={ServiceValidationSchema}
          initialValues={this.props.service}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: IRootState) => {
  return {
    isBusy: state.services.isBusy,
    service: state.services.selectedItem,
    locationId: state.currentLocation.locationId,
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({clearState, updateServiceAsync, getServiceAsync, getEmployeesAsync, addServiceAsync, clearError}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withParams(withNavigation(ServiceUpsertContainer)));