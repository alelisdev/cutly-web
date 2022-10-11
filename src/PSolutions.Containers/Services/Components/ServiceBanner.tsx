import React from "react";
import cn from "classnames";
import Avatar from "react-avatar";
import { Card, Row } from "react-bootstrap";
import { IService } from "../Types";
import styles from "../Styles/services.module.css";
import { CutlyCropper } from "../../../PSolutions.UI/Cropper";
import placeholder from '../../../PSolutions.Assets/images/image-placeholder.png';

interface Props {
  service: IService;
  disabled?: boolean;

  uploadImageAsync(base64: string): any;
}

interface State {
  showCropper: boolean;
}

export class ServiceBanner extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {showCropper: false};
    this.toggleCropper = this.toggleCropper.bind(this);
    this.handleImageUploadAsync = this.handleImageUploadAsync.bind(this);
  }

  toggleCropper() {
    if (!!this.props.disabled) return;
    this.setState({showCropper: !this.state.showCropper});
  }

  async handleImageUploadAsync(base64: string) {
    await this.props.uploadImageAsync(base64);
    this.toggleCropper();
  }

  render() {
    const { servicePhoto, serviceName } = this.props.service;
    const appliesStyles = cn("shadow-sm", styles.avatarHolder);

    return (
      <Card className="mb-3">
        <CutlyCropper show={this.state.showCropper} image={servicePhoto} toggleModal={this.toggleCropper} placeholder={placeholder} handleImageUpload={this.handleImageUploadAsync}/>
        <Card.Header className="position-relative min-vh-25 mb-7">
          <div className={cn("bg-holder rounded-3 rounded-bottom-0", styles.coverHolder)}/>
          <div className="avatar avatar-5xl avatar-profile">
            <Avatar size="100%" round={true} name={serviceName} maxInitials={2} src={servicePhoto} className={appliesStyles} onClick={this.toggleCropper}/>
          </div>
        </Card.Header>
        <Card.Body><Row><h4 className="mb-1">{serviceName}</h4><p className="text-500">{serviceName}</p></Row></Card.Body>
      </Card>
    );
  }
}