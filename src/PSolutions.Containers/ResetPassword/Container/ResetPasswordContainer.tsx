import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { Formik, FormikHelpers } from "formik";
import { bindActionCreators, Dispatch } from "redux";
import { ResetPasswordSchema } from "./ResetPasswordSchema";
import { ResetPasswordView } from "../Views/ResetPasswordView";
import { signIn } from "../../../PSolutions.App/Redux/Actions";
import { IUserCredentials } from "../../../PSolutions.App/Types";

interface Props {
  signIn(credentials: IUserCredentials): any;
}

interface State {
  email: string;
  newPassword: string;
  confirmPassword: string;
}

class ResetPasswodContainer extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {email: "", newPassword: "", confirmPassword: ""};
    this.handleSubmitAsync = this.handleSubmitAsync.bind(this);
  }

  async handleSubmitAsync(values: State, actions: FormikHelpers<State>) {
    
    if(values?.newPassword !== values?.confirmPassword) {
      console.log('something went wrong!')
    } else {
      const response = await axios.post<IUserCredentials>('biz/authentication/resetpasswrd', values);
      if (!!response.data) this.props.signIn(response.data);
      else actions.setSubmitting(false);
    }
  }

  render() {
    return (
      <Formik
        component={ResetPasswordView}
        initialValues={this.state}
        validationSchema={ResetPasswordSchema}
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

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswodContainer);