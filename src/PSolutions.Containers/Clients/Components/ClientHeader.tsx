import React from "react";
import { IntlContext } from "react-intl";
import { Card, Col, Row } from "react-bootstrap";
import { IconButton } from "../../../PSolutions.UI/Buttons/IconButton";
import { withNavigation } from "../../../PSolutions.Providers/Navigation";

interface Props {
  navigate(to: string): void;
}

class ClientHeader extends React.PureComponent<Props> {
  static contextType = IntlContext;
  context!: React.ContextType<typeof IntlContext>;

  constructor(props: Props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.navigate("Upsert")
  }

  render() {
    const title = this.context.formatMessage({id: "generic.messages.clients"});
    const newTitle = this.context.formatMessage({id: "generic.messages.new.client"});
    return (
      <Card.Header className="bg-light">
        <Row className="flex-between-center">
          <Col xs={4} sm="auto" className="d-flex align-items-center pe-0"><h5>{title}</h5></Col>
          <Col xs={8} sm="auto" className="ms-auto text-end ps-0">
            <IconButton icon="plus" variant="falcon-secondary" size="sm" onClick={this.handleClick}>
              <span className="d-none d-sm-inline-block ms-1">{newTitle}</span>
            </IconButton>
          </Col>
        </Row>
      </Card.Header>
    );
  }
}

export default withNavigation(ClientHeader);