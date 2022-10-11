import React from "react";
import { FastField } from "formik";
import { PsFormSwitch } from "../Form/Components/PSFormSwitch";

interface Props {
  id: string;
  name: string;
  label: string;
  className?: string;
  defaultChecked?: boolean;
}

export class SwitchField extends React.PureComponent<Props> {

  render() {
    return (
      <FastField
        type="checkbox"
        id={this.props.id}
        name={this.props.name}
        component={PsFormSwitch}
        label={this.props.label}
        className={this.props.className}
      />
    );
  }
}