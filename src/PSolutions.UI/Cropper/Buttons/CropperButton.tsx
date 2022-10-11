import React from "react";
import cn from "classnames";
import styles from './cropper.button.module.css';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: any;
  active?: boolean;
  className: string;
}

export class CropperButton extends React.PureComponent<Props> {
  render() {
    const {active, children, className, ...rest} = this.props;
    const appliedStyles = cn(styles.imageEditorButton, {[styles.imageEditorButtonActive]: active}, className);
    return <button className={appliedStyles} {...rest}>{children}</button>;
  }
}