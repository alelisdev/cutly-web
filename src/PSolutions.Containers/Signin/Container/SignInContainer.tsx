import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { Formik, FormikHelpers } from "formik";
import { bindActionCreators, Dispatch } from "redux";
import { SignInSchema } from "./SignInSchema";
import { SignInView } from "../Views/SignInView";
import { signIn } from "../../../PSolutions.App/Redux/Actions";
import { IUserCredentials } from "../../../PSolutions.App/Types";

interface Props {
  signIn(credentials: IUserCredentials): any;
}

interface State {
  email: string;
  password: string;
}

class SignInContainer extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {email: "", password: ""};
    this.handleSubmitAsync = this.handleSubmitAsync.bind(this);
  }

  async handleSubmitAsync(values: State, actions: FormikHelpers<State>) {
    const response = await axios.post<IUserCredentials>('biz/authentication/signIn', values);
    if (!!response.data) this.props.signIn(response.data);
    else actions.setSubmitting(false);
  }

  render() {
    return (
      <Formik
        component={SignInView}
        initialValues={this.state}
        validationSchema={SignInSchema}
        onSubmit={this.handleSubmitAsync}
      />
    );
  }
}

const mapStateToProps = () => {
  return {};
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({signIn}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer);