import React from "react";
import { FastField } from "formik";
import { PSFormCheck } from "../Form/Components/FormCheck";

interface Props {
  id: string;
  name: string;
  label: string;
  className?: string;
  defaultChecked?: boolean;
}

export class CheckField extends React.PureComponent<Props> {

  render() {
    return (
      <FastField
        type="checkbox"
        id={this.props.id}
        component={PSFormCheck}
        name={this.props.name}
        label={this.props.label}
        className={this.props.className}
      />
    );
  }
}