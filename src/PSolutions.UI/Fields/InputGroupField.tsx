import React from "react";
import { FastField } from "formik";
import { FormInputGroup } from "../Form/Components/FormGroupInput";

interface Props {
  id: string;
  name: string;
  type: string;
  suffix: string;
  colNum?: number;
  label?: string;
  required: boolean;
  className?: string;
  placeholder: string;
  hideValid?: boolean;
  disabled?: boolean | undefined;
}

export class InputGroupField extends React.PureComponent<Props> {
  render() {
    return (
      <FastField
        id={this.props.id}
        type={this.props.type}
        name={this.props.name}
        label={this.props.label}
        component={FormInputGroup}
        suffix={this.props.suffix}
        colNum={this.props.colNum}
        disabled={this.props.disabled}
        required={this.props.required}
        hideValid={this.props.hideValid}
        className={this.props.className}
        placeholder={this.props.placeholder}
      />
    );
  }
}