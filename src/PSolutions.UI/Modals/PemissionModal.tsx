import React from "react"
import { Button, Modal } from 'react-bootstrap';
import { BsFillExclamationTriangleFill } from "react-icons/bs";

interface Props {
  show: boolean;
  contents: string;
  title: string;
}

interface State {
  showModal : boolean;
}

export class PermissionModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.state = {showModal: props.show};
  }

  handleClose = () => {
    this.setState({showModal: false})
  }

  render() {
    const { showModal } = this.state;
    const {title, contents} = this.props;

    return (
      <Modal show={showModal} onHide={this.handleClose} backdrop="static" keyboard={false}>
        <Modal.Body>
          <div className='modal-contents'>
            <BsFillExclamationTriangleFill color="#f78b26" size={120} />
            <div>
              <h5 className="modal-title">{title}</h5>
              <p className="modal-text">{contents}</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-light border-top-0">
          <Button size="sm" variant="falcon-default" onClick={this.handleClose}>I understand</Button>
        </Modal.Footer>
      </Modal>
    )
  }

}
