import React from "react";
import cn from 'classnames';
import { Button, ButtonProps } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props extends ButtonProps {
  icon: any;
  transform?: string;
  iconClassName?: string;
}

export class IconButton extends React.PureComponent<Props> {
  render() {
    const {icon, iconClassName, transform, ...rest} = this.props;
    return <Button {...rest}><FontAwesomeIcon icon={icon} className={cn(iconClassName)} transform={transform}/>{this.props.children}</Button>;
  }
}