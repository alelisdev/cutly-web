import React from "react";
import { connect } from "react-redux";
import { Formik, FormikHelpers } from "formik";
import { bindActionCreators, Dispatch } from "redux";
import { ILocationRequest } from "../Types";
import { LocationSchema } from "./LocationSchema";
import { IRootState } from "../../../PSolutions.State";
import { LocationUpsertView } from "../Views/LocationUpsertView";
import { addNewLocationAsync, clearState } from "../Redux/Actions";
import { withNavigation } from "../../../PSolutions.Providers/Navigation";

interface Props {
  locationRequest: ILocationRequest,

  clearState(): void;

  navigate(to: any): void;

  addNewLocationAsync(request: ILocationRequest): any;
}

class LocationUpsertContainer extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.submitAsync = this.submitAsync.bind(this);
  }

  componentWillUnmount() {
    this.props.clearState();
  }

  async submitAsync(values: ILocationRequest, actions: FormikHelpers<any>) {
    const res = await this.props.addNewLocationAsync(values);
    actions.setSubmitting(false);
    if (!!res) this.props.navigate(-1);
  }

  render() {
    return (
      <Formik
        enableReinitialize={true}
        onSubmit={this.submitAsync}
        component={LocationUpsertView}
        validationSchema={LocationSchema}
        initialValues={this.props.locationRequest}
      />
    );
  }
}

const mapStateToProps = (state: IRootState) => {
  return {
    locationRequest: state.locations.locationRequest,
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({clearState, addNewLocationAsync}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(LocationUpsertContainer));