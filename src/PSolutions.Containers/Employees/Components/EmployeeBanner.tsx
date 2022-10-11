import React from "react";
import cn from "classnames";
import Avatar from "react-avatar";
import { Card, Row } from "react-bootstrap";
import { IEmployee } from "../Types";
import styles from "../Styles/employees.module.css";
import { CutlyCropper } from "../../../PSolutions.UI/Cropper";
import placeholder from '../../../PSolutions.Assets/images/image-placeholder.png';

interface Props {
  employee: IEmployee;

  uploadImageAsync(base64: string): any;
}

interface State {
  showCropper: boolean;
}

export class EmployeeBanner extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {showCropper: false};
    this.toggleCropper = this.toggleCropper.bind(this);
    this.handleImageUploadAsync = this.handleImageUploadAsync.bind(this);
  }

  toggleCropper() {
    this.setState({showCropper: !this.state.showCropper});
  }

  async handleImageUploadAsync(base64: string) {
    await this.props.uploadImageAsync(base64);
    this.toggleCropper();
  }

  render() {
    const {firstName, lastName, profilePhoto, title} = this.props.employee;
    const appliesStyles = cn("shadow-sm", styles.avatarHolder);
    const fullName = `${firstName} ${lastName}`;

    return (
      <Card className="mb-3">
        <CutlyCropper show={this.state.showCropper} image={profilePhoto} toggleModal={this.toggleCropper} placeholder={placeholder} handleImageUpload={this.handleImageUploadAsync}/>
        <Card.Header className="position-relative min-vh-25 mb-7">
          <div className={cn("bg-holder rounded-3 rounded-bottom-0", styles.coverHolder)}/>
          <div className="avatar avatar-5xl avatar-profile">
            <Avatar size="100%" round={true} name={fullName} maxInitials={2} src={profilePhoto} className={appliesStyles} onClick={this.toggleCropper}/>
          </div>
        </Card.Header>
        <Card.Body><Row><h4 className="mb-1">{fullName}</h4><p className="text-500">{title}</p></Row></Card.Body>
      </Card>
    );
  }
}