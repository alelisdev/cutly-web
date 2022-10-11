import React from "react";
import { IntlContext } from "react-intl";
import { DangerButton } from "../../../../PSolutions.UI/Buttons/DangerButton";
import { PSFormCard } from "../../../../PSolutions.UI/Form/FormLayout/PSFormCard";
import { PSCardSideBar } from "../../../../PSolutions.UI/Form/FormLayout/PSCardSideBar";
import { ConfirmationModal } from "../../../../PSolutions.UI/Modals/Confirmation/ConfirmationModal";

interface Props {
  isBusy: boolean;
  disabled: boolean;

  onDeleteServiceAsync(): void;
}

interface State {
  showModal: boolean;
}

export class SidebarServiceDelete extends React.PureComponent<Props, State> {
  static contextType = IntlContext;
  context!: React.ContextType<typeof IntlContext>;

  constructor(props: Props) {
    super(props);
    this.state = {showModal: false};
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleServiceDeletion = this.handleServiceDeletion.bind(this);
  }

  handleDeleteClick() {
    if (this.props.disabled) return;
    this.setState({showModal: !this.state.showModal});
  }

  async handleServiceDeletion() {
    await this.props.onDeleteServiceAsync();
    this.handleDeleteClick();
  }

  render() {
    return (
      <PSCardSideBar columns={4}>
        <PSFormCard title={this.context.formatMessage({id: "generic.messages.danger.zone"})}>
          <div className="mb-0 mt-0">
            <h5 className="mb-0">{this.context.formatMessage({id: "services.service.upsert.danger.zone.delete.service"})}</h5>
            <p className="fs--1">{this.context.formatMessage({id: "services.service.upsert.danger.zone.delete.service.description"})}</p>
            <DangerButton
              isBusy={false}
              onClick={this.handleDeleteClick}
              title={this.context.formatMessage({id: "services.service.upsert.danger.zone.delete"})}
              className={this.props.disabled ? "w-100 btn btn-falcon-default" : "w-100 btn btn-falcon-danger"}
            />
          </div>
        </PSFormCard>
        <ConfirmationModal
          isBusy={this.props.isBusy}
          show={this.state.showModal}
          toggleModal={this.handleDeleteClick}
          onConfirmClick={this.handleServiceDeletion}
          title={this.context.formatMessage({id: "generic.messages.delete.title"})}
          contents={this.context.formatMessage({id: "generic.messages.delete.description"})}
          deleteButtonText={this.context.formatMessage({id: 'services.service.upsert.danger.zone.delete.service'})}
        />
      </PSCardSideBar>
    );
  }
}