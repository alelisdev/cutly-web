import React from "react";
import { FastField } from "formik";
import { ISelectOption } from "../../PSolutions.Contracts/Common";
import { PSFormSelect } from "../Form/Components/PSFormSelect";

interface Props {
  id: string;
  icon?: any;
  name: string;
  label?: string;
  colNum?: number;
  required: boolean;
  disabled?: boolean;
  placeholder?: string;
  options: Array<ISelectOption>;
}

export class SelectField extends React.PureComponent<Props> {
  render() {
    return (
      <FastField
        id={this.props.id}
        name={this.props.name}
        icon={this.props.icon}
        component={PSFormSelect}
        label={this.props.label}
        colNum={this.props.colNum}
        options={this.props.options}
        disabled={this.props.disabled}
        required={this.props.required}
        placeholder={this.props.placeholder}
      />
    );
  }
}