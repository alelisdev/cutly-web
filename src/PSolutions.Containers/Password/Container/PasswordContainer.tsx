import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { Formik, FormikHelpers } from "formik";
import { bindActionCreators, Dispatch } from "redux";
import { PasswordSchema } from "./PasswordSchema";
import { PasswordView } from "../Views/PasswordView";

interface Props {
  employeeId: number;
}

interface State {
  employeeId: number;
  newPassword: string;
  repeatPassword: string;
  currentPassword: string;
}

class PasswordContainer extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleSubmitAsync = this.handleSubmitAsync.bind(this);
    this.state = {newPassword: "", repeatPassword: "", currentPassword: "", employeeId: props.employeeId};
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    if (prevProps.employeeId === this.props.employeeId) return;
    this.setState({employeeId: this.props.employeeId});
  }

  async handleSubmitAsync(values: State, actions: FormikHelpers<State>) {
    await axios.put('biz/authentication/changePassword', values);
    actions.setSubmitting(false);
  }

  render() {
    return <Formik component={PasswordView} initialValues={this.state} validationSchema={PasswordSchema} onSubmit={this.handleSubmitAsync}/>;
  }
}

const mapStateToProps = () => {
  return {};
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordContainer);