import React from "react";
import { FormikProps } from "formik";
import { Form } from "react-bootstrap";
import { IntlContext } from "react-intl";
import { InputField } from "../../../PSolutions.UI/Fields/InputField";
import { PrimaryButton } from "../../../PSolutions.UI/Buttons/PrimaryButton";

interface Props extends FormikProps<any> {
}

export class ForgotPasswordView extends React.PureComponent<Props> {
  static contextType = IntlContext;
  context!: React.ContextType<typeof IntlContext>;

  render() {
    const {submitForm, isSubmitting, isValid} = this.props;
    const resetLink = this.context.formatMessage({id: "generic.messages.send.reset.link"});
    const emailAddress = this.context.formatMessage({id: "generic.messages.forgot.email.address"});
    const forgotPassword = this.context.formatMessage({id: "generic.messages.forgot.your.password"});
    const forgotSubscription = this.context.formatMessage({id: "generic.messages.forgot.subscription"});

    return (
      <React.Fragment>
        <div className="d-flex flex-column text-center justify-content-center mb-4">
          <h5 className="mb-2">{forgotPassword}</h5>
          <span className="fs--1 text-600">{forgotSubscription}</span>
        </div>
        <InputField required name="email" type="email" className="mb-3" id="login-email" hideValid={true} placeholder={emailAddress}/>
        <Form.Group>
          <PrimaryButton title={resetLink} isBusy={isSubmitting} disabled={isSubmitting || !isValid} className="mt-3 w-100" onClick={submitForm}/>
        </Form.Group>
      </React.Fragment>
    );
  }
}