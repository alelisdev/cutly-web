import React from "react"
import cn from "classnames";
import { FormattedMessage } from "react-intl";
import { Button, Modal } from 'react-bootstrap';
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import styles from './confirmation.module.css';
import { DangerButton } from "../../Buttons/DangerButton";

interface Props {
  show: boolean;
  title: string;
  isBusy: boolean;
  contents: string;
  deleteButtonText: string;

  toggleModal(): void;

  onConfirmClick(): void;
}

export class ConfirmationModal extends React.Component<Props> {

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.toggleModal} backdrop="static" keyboard={false}>
        <Modal.Body>
          <div className={styles.container}>
            <BsFillExclamationTriangleFill color="#e63757" size={55}/>
            <div className="ps-3 pt-2">
              <h5 className="fs-1 fw-semi-bold">{this.props.title}</h5>
              <p className="fs--1 fw-medium pt-1">{this.props.contents}</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className={cn("bg-light", styles.footer)}>
          <Button className="me-2" size="sm" variant="outline" onClick={this.props.toggleModal}>
            <FormattedMessage id="generic.messages.back"/>
          </Button>
          <DangerButton isBusy={this.props.isBusy} onClick={this.props.onConfirmClick} title={this.props.deleteButtonText} className="danger" disabled={false}/>
        </Modal.Footer>
      </Modal>
    )
  }

}
