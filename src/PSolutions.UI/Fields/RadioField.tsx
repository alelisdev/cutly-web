import React from "react";
import { FastField } from "formik";
import { PSFormRadio } from "../Form/Components/PSFormRadio";

interface Props {
  id: string;
  name: string;
  label: string;
  className?: string;
  defaultValue: any;
  disabled?: boolean;
}

export class RadioField extends React.Component<Props> {
  render() {
    return (
      <FastField
        type="radio"
        id={this.props.id}
        component={PSFormRadio}
        name={this.props.name}
        label={this.props.label}
        disabled={this.props.disabled}
        className={this.props.className}
        defaultValue={this.props.defaultValue}
      />
    );
  }
}