import React from "react";
import { FormikProps } from "formik";
import { IntlContext } from "react-intl";
import { IChangePasswordRequest } from "../Types";
import { PrimaryButton } from "../../../PSolutions.UI/Buttons/PrimaryButton";
import { InputField } from "../../../PSolutions.UI/Fields/InputField";
import { PSFormRow } from "../../../PSolutions.UI/Form/FormLayout/PSFormRow";

interface Props extends FormikProps<IChangePasswordRequest> {
}

export class PasswordView extends React.PureComponent<Props> {
  static contextType = IntlContext;
  context!: React.ContextType<typeof IntlContext>;

  render() {
    const {submitForm, isSubmitting, isValid} = this.props;
    const submitDisabled = isSubmitting || !isValid;

    const passwordOld = this.context.formatMessage({id: 'generic.messages.password.old'});
    const passwordNew = this.context.formatMessage({id: 'generic.messages.password.new'});
    const passwordUpdate = this.context.formatMessage({id: 'generic.messages.password.update'});
    const passwordConfirm = this.context.formatMessage({id: 'generic.messages.password.confirm'});

    return (
      <React.Fragment>
        <PSFormRow>
          <InputField type="text" colNum={12} placeholder={''} id="title" name="passwordOld" required={true} label={passwordOld}/>
        </PSFormRow>
        <PSFormRow>
          <InputField type="text" colNum={12} placeholder={''} id="title" name="passwordNew" required={true} label={passwordNew}/>
        </PSFormRow>
        <PSFormRow>
          <InputField type="text" colNum={12} placeholder={''} id="title" name="passwordConfirm" required={true} label={passwordConfirm}/>
        </PSFormRow>
        <PrimaryButton title={passwordUpdate} isBusy={isSubmitting} className="w-100 btn btn-primary" onClick={submitForm} disabled={submitDisabled}/>
      </React.Fragment>
    );
  }
}