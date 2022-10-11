import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import envelope from "../../../PSolutions.Assets/images/mailbox.png";


interface Props {
  layout: string;
  titleTag: any;
}

const ConfirmEmailView = ({ titleTag : TitleTag }: Props) => (
  <>
    <img className="d-block mx-auto mb-4" src={envelope} alt="sent" width={100}/>
    <TitleTag>Please check your email!</TitleTag>
    <p>
      An email has been sent. Please click on the
      included link to reset your password.
    </p>
    <Link to="/">
      <Button color='primary' className="mt-3 btn">
        <FontAwesomeIcon icon="chevron-left" transform="shrink-4 down-1" className="me-1"/>
        Return to login
      </Button>
    </Link>
  </>
);

ConfirmEmailView.propTypes = {
  layout: PropTypes.string,
  titleTag: PropTypes.string
};

ConfirmEmailView.defaultProps = { layout: 'simple', titleTag: 'h4' };

export default ConfirmEmailView;
