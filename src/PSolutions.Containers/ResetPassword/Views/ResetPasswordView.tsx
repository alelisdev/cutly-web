import React from "react";
import { FormikProps } from "formik";
import { Form } from "react-bootstrap";
import { IntlContext } from "react-intl";
import { InputField } from "../../../PSolutions.UI/Fields/InputField";
import { PrimaryButton } from "../../../PSolutions.UI/Buttons/PrimaryButton";

interface Props extends FormikProps<any> {
}


export class ResetPasswordView extends React.PureComponent<Props> {
  static contextType = IntlContext;
  context!: React.ContextType<typeof IntlContext>;

  render() {
    const {submitForm, isSubmitting, isValid} = this.props;
    const changePassword = this.context.formatMessage({id: "generic.messages.password.change"});
    const newPass = this.context.formatMessage({id: "generic.messages.password.new"});
    const conPass = this.context.formatMessage({id: "generic.messages.password.confirm"});
    const updatePass = this.context.formatMessage({id: "generic.messages.password.update"});

    return (
      <React.Fragment>
        <div className="d-flex justify-content-center mb-4"><h5>{changePassword}</h5></div>
        <InputField
          required
          name="newPassword"
          type="password"
          className="mb-3"
          id="newPassword"
          hideValid={true}
          placeholder={newPass}
        />
        <InputField
          required
          name="confirmPassword"
          type="password"
          className="mb-3"
          id="confirmPassword"
          hideValid={true}
          placeholder={conPass}
        />
        <Form.Group>
          <PrimaryButton title={updatePass} isBusy={isSubmitting} disabled={isSubmitting || !isValid} className="mt-3 w-100" onClick={submitForm}/>
        </Form.Group>
      </React.Fragment>
    );
  }
}