import React from "react";
import { IntlContext } from "react-intl";
import { Button } from "react-bootstrap";
import { PrimaryButton } from "../../../../PSolutions.UI/Buttons/PrimaryButton";
import { PSFormFooter } from "../../../../PSolutions.UI/Form/FormLayout/PSFormFooter";

interface Props {
  disabled: boolean;
  iSubmitting: boolean;

  onSubmit(): void;

  onBackClick(): void;
}

export class ServiceUpsertFooter extends React.PureComponent<Props> {
  static contextType = IntlContext;
  context!: React.ContextType<typeof IntlContext>;

  render() {
    return (
      <PSFormFooter>
        <Button
          className="me-2"
          variant="falcon-outline"
          onClick={this.props.onBackClick}>
          {this.context.formatMessage({id: "generic.messages.back"})}
        </Button>
        <PrimaryButton
          className="w-auto"
          isBusy={this.props.iSubmitting}
          onClick={this.props.onSubmit}
          disabled={this.props.disabled}
          title={this.context.formatMessage({id: "generic.messages.save"})}
        />
      </PSFormFooter>
    );
  }
}