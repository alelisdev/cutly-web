import React from "react";
import { FastField } from "formik";
import { PSFormTextarea } from "../Form/Components/PSFormTextarea";

interface Props {
  id: string;
  name: string;
  rows: number;
  label: string;
  required: boolean;
  placeholder: string;
  colNum?: number | undefined;
  disabled?: boolean | undefined;
}

export class TextAreaField extends React.PureComponent<Props> {
  render() {
    return (
      <FastField
        id={this.props.id}
        rows={this.props.rows}
        name={this.props.name}
        label={this.props.label}
        component={PSFormTextarea}
        colNum={this.props.colNum}
        disabled={this.props.disabled}
        required={this.props.required}
        placeholder={this.props.placeholder}
      />
    );
  }
}