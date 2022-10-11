import React from "react";
import cn from 'classnames';
import { Card } from "react-bootstrap";
import { ILocation } from "../Types";
import styles from '../Styles/locations.module.css';
import { SelectedIndicator } from "./SelectedIndicator";
import { withNavigation } from "../../../PSolutions.Providers/Navigation";
import placeholder from '../../../PSolutions.Assets/images/image-placeholder.png';

interface Props {
  location: ILocation
  selectedLocationId: number;

  navigate(to: string): void;

  onClick(location: ILocation): void;
}

class LocationItem extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.onLocationClick = this.onLocationClick.bind(this);
  }

  onLocationClick() {
    this.props.onClick(this.props.location);
    setTimeout(() => this.props.navigate("/"), 150);
  }

  render() {
    const {selectedLocationId, location} = this.props;
    const selected = selectedLocationId === location.providerId;
    const cardStyle = cn(styles.locationItem, {[styles.selected]: selected});
    return (
      <Card className={cardStyle} onClick={this.onLocationClick}>
        <Card.Img src={location?.coverImage || placeholder} variant='top' className={styles.locationItemImg}/>
        <SelectedIndicator checked={selectedLocationId === location.providerId}/>
        <Card.Body>
          <Card.Title as='h5'>{location.name}</Card.Title>
          <Card.Text className={cn("text-500", styles.locationAddress)}>{location.address}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default withNavigation(LocationItem);