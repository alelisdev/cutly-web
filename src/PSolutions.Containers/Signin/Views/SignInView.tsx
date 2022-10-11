import React from "react";
import { FormikProps } from "formik";
import { Link } from "react-router-dom";
import { IntlContext } from "react-intl";
import { Col, Row, Form} from "react-bootstrap";
import { InputField } from "../../../PSolutions.UI/Fields/InputField";
import { PrimaryButton } from "../../../PSolutions.UI/Buttons/PrimaryButton";

interface Props extends FormikProps<any> {
}

export class SignInView extends React.PureComponent<Props> {
  static contextType = IntlContext;
  context!: React.ContextType<typeof IntlContext>;

  render() {
    const {submitForm, isSubmitting, isValid} = this.props;
    const login = this.context.formatMessage({id: "generic.messages.login"});
    const email = this.context.formatMessage({id: "generic.messages.email"});
    const password = this.context.formatMessage({id: "generic.messages.password"});
    const remember = this.context.formatMessage({id: "generic.messages.remember.me"});
    const forgotPassword = this.context.formatMessage({id: "generic.messages.forgot.password"});

    return (
      <React.Fragment>
        <div className="d-flex justify-content-center mb-4">
          <h5>{login}</h5>
        </div>
        <InputField
          required
          name="email"
          type="email"
          className="mb-3"
          id="login-email"
          hideValid={true}
          placeholder={email}
        />
        <InputField
          required
          name="password"
          type="password"
          hideValid={true}
          className="mb-3"
          id="login-password"
          placeholder={password}
        />
        <Row className="justify-content-between align-items-center">
          <Col xs="auto">
            <Form.Check type="checkbox" id="rememberMe">
              <Form.Check.Input type="checkbox" name="remember" defaultChecked={true}/>
              <Form.Check.Label className="mb-0">{remember}</Form.Check.Label>
            </Form.Check>
          </Col>
          <Col xs="auto">
            <Link className="fs--1 mb-0" to="ForgotPassword">{forgotPassword}</Link>
          </Col>
        </Row>
        <Form.Group>
          <PrimaryButton title={login} isBusy={isSubmitting} disabled={isSubmitting || !isValid} className="mt-3 w-100" onClick={submitForm}/>
        </Form.Group>
      </React.Fragment>
    );
  }
}