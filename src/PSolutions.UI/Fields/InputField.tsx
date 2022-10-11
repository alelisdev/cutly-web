import React from "react";
import { FastField} from "formik";
import { FormInput } from "../Form/Components/FormInput";

interface Props {
  id: string;
  name: string;
  type: string;
  hide?: boolean;
  colNum?: number;
  step?: any;
  label?: string;
  suffix?: string;
  required: boolean;
  className?: string;
  placeholder: string;
  hideValid?: boolean;
  disabled?: boolean | undefined;
}

/**
 *  Formik input field
 */
export class InputField extends React.PureComponent<Props> {
  render() {
    return (
      <FastField
        id={this.props.id}
        component={FormInput}
        hide={this.props.hide}
        type={this.props.type}
        name={this.props.name}
        label={this.props.label}
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