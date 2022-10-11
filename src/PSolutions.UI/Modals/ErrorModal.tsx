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

export class ErrorModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.state = { showModal: this.props.show };
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
            <BsFillExclamationTriangleFill color="#e63757" size={30} />
            <div>
              <h5 className="modal-title">{title}</h5>
              <p className="modal-text">{contents}</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-light">
          <Button className="me-2" size="sm" variant="outline" onClick={this.handleClose}>Cancel</Button>
          <Button size="sm" variant="danger" onClick={this.handleClose}>Deactivate</Button>
        </Modal.Footer>
      </Modal>
    )
  }

}
