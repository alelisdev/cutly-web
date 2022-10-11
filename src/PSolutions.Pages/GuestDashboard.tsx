import React from "react";
import { IntlContext } from "react-intl";
import { Navigate, Route, Routes } from "react-router-dom";
import { Card, Col, Container, Row } from 'react-bootstrap';
import SignInContainer from "../PSolutions.Containers/Signin/Container/SignInContainer";
import ConfirmMailContainer from "../PSolutions.Containers/ConfirmEmail/Container/ConfirmMailContainer";
import ResetPasswordContainer from "../PSolutions.Containers/ResetPassword/Container/ResetPasswordContainer";
import ForgotPasswordContainer from "../PSolutions.Containers/ForgotPassword/Container/ForgotPasswordContainer";

interface Props {
  show: boolean;
}

export class GuestDashboard extends React.PureComponent<Props> {
  static contextType = IntlContext;
  context!: React.ContextType<typeof IntlContext>;

  render() {
    if(!this.props.show) return null;
    return (
      <section className="py-0">
        <Container fluid>
          <Row className="justify-content-center min-vh-100 py-10">
            <Col sm={12} md={12} lg={10} xl={7} xxl={3}>
              <Card>
                <Card.Body className="p-4 p-sm-5">
                  <Routes>
                    <Route path="/" element={<SignInContainer/>}/>
                    <Route path="/ForgotPassword" element={<ForgotPasswordContainer/>}/>
                    <Route path="/ResetPassword" element={<ResetPasswordContainer/>}/>
                    <Route path="/ConfirmEmail" element={<ConfirmMailContainer/>}/>
                    <Route path="*" element={<Navigate to="/"/>}/>
                  </Routes>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}