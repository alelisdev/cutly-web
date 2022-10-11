import React from "react";
import { FormattedMessage } from "react-intl";
import { Button, Spinner } from "react-bootstrap";
import styles from './Styles/button.module.css';

interface Props {
  title: string;
  isBusy: boolean;
  className: string;
  disabled?: boolean;

  onClick(): void;
}

export class PrimaryButton extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.getLoadingContent = this.getLoadingContent.bind(this);
  }

  getLoadingContent() {
    return (
      <span className="d-flex align-items-center justify-content-center">
        <FormattedMessage id="generic.messages.please.wait"/>
        <Spinner animation="grow" size="sm" className={styles.spinner}/>
      </span>
    )
  }

  render() {
    const {onClick, disabled, isBusy, title, className} = this.props;
    return (
      <Button color="primary" className={className} onClick={onClick} disabled={disabled}>
        {isBusy ? this.getLoadingContent() : title}
      </Button>
    );
  }
}