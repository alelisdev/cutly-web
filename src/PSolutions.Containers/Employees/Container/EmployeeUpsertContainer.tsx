import React from "react";
import { connect } from "react-redux";
import { IntlContext } from "react-intl";
import { Params } from "react-router-dom";
import { Formik, FormikHelpers } from "formik";
import { bindActionCreators, Dispatch } from "redux";
import { IEmployee } from "../Types";
import { EmployeeSchema } from "./EmployeeSchema";
import { IRootState } from "../../../PSolutions.State";
import { EmployeeUpsertView } from "../Views/EmployeeUpsertView";
import { getServicesAsync } from "../../Services/Redux/Actions";
import { BusyIndicator } from "../../../PSolutions.UI/Loaders/BusyIndicator";
import { withNavigation, withParams } from "../../../PSolutions.Providers/Navigation";
import { clearState, getEmployeeAsync, updateEmployeeAsync } from "../Redux/Actions";

interface Props {
  isBusy: boolean;
  locationId: number;
  employee: IEmployee
  params: Readonly<Params>;

  clearState(): void;

  navigate(to: any, options?: any): void;

  getServicesAsync(locationId: number): void;

  getEmployeeAsync(employeeId: string): any;

  updateEmployeeAsync(employee: IEmployee): any;
}

class EmployeeUpsertContainer extends React.PureComponent<Props> {
  static contextType = IntlContext;
  context!: React.ContextType<typeof IntlContext>;

  constructor(props: Props) {
    super(props);
    this.submitAsync = this.submitAsync.bind(this);
  }

  componentWillUnmount() {
    this.props.clearState();
  }

  async componentDidMount() {
    const {locationId} = this.props;
    const id = this.props.params.id || 0;

    // Fetch data
    await this.props.getServicesAsync(locationId);
    if (!!id) await this.props.getEmployeeAsync(id);
  }

  async submitAsync(values: IEmployee, formikActions: FormikHelpers<any>) {
    const updated = await this.props.updateEmployeeAsync(values);
    formikActions.setSubmitting(false);
    if (!!updated) this.props.navigate(-1);
  }

  render() {
    return (
      <React.Fragment>
        <BusyIndicator show={this.props.isBusy}/>
        <Formik
          enableReinitialize={true}
          onSubmit={this.submitAsync}
          component={EmployeeUpsertView}
          validationSchema={EmployeeSchema}
          initialValues={this.props.employee}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: IRootState) => {
  return {
    isBusy: state.employee.isBusy,
    employee: state.employee.selectedItem,
    locationId: state.currentLocation.locationId,
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({clearState, getEmployeeAsync, updateEmployeeAsync, getServicesAsync}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withParams(withNavigation(EmployeeUpsertContainer)));