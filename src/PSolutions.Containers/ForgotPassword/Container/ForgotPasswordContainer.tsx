import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { Formik, FormikHelpers } from "formik";
import { bindActionCreators, Dispatch } from "redux";
import { ForgotPasswordSchema } from "./ForgotPasswordSchema";
import { ForgotPasswordView } from "../Views/ForgotPasswordView";
import { withNavigation } from "../../../PSolutions.Providers/Navigation";

interface Props {
  navigate(to: string): any;
}

interface State {
  email: string;
}

class ForgotPasswordContainer extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {email: "",};
    this.handleSubmitAsync = this.handleSubmitAsync.bind(this);
  }

  async handleSubmitAsync(values: State, actions: FormikHelpers<State>) {
    const response = await axios.post('biz/authentication/forgotPassword', values);
    if (!!response.data) {
      this.setState({email: values.email});
      this.props.navigate("/ConfirmEmail");
    }
    else actions.setSubmitting(false);
  }

  render() {
    return (
      <Formik
        validateOnMount={true}
        initialValues={this.state}
        component={ForgotPasswordView}
        onSubmit={this.handleSubmitAsync}
        validationSchema={ForgotPasswordSchema}
      />
    );
  }
}

const
  mapStateToProps = () => {
    return {};
  }

const
  mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({}, dispatch)
  }

export default connect(mapStateToProps, mapDispatchToProps)

(
  withNavigation(ForgotPasswordContainer)
);