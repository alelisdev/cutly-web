import React from "react";
import { FieldProps } from "formik";
import { Col, Form } from "react-bootstrap";
import Select, { CSSObjectWithLabel, OptionProps, SingleValue, StylesConfig } from 'react-select';
import { ISelectOption } from "../../../PSolutions.Contracts/Common";
import { IntlContext } from "react-intl";

interface Props extends FieldProps {
  type: any;
  id: string;
  name: string;
  colNum: number;
  label: string;
  className?: string;
  required: boolean;
  hideValid?: boolean;
  placeholder: string;
  disabled?: boolean | undefined
  options: Array<ISelectOption>;
}

interface State {
  focused: boolean;
}

export class PSFormSelect extends React.PureComponent<Props, State> {
  static contextType = IntlContext;
  context!: React.ContextType<typeof IntlContext>;

  constructor(props: Props) {
    super(props);
    this.state = {focused: false};
    this.errorMessage = this.errorMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getValueFromOptions = this.getValueFromOptions.bind(this);
    this.renderRequiredMark = this.renderRequiredMark.bind(this);
  }

  errorMessage() {
    const error: any = this.props.form.errors[this.props.field.name] || undefined;
    return !error ? null : this.context.formatMessage({id: error.key}, error.values);
  }

  handleChange(selectOption: SingleValue<ISelectOption>) {
    this.props.form.setFieldTouched(this.props.field.name, true);
    this.props.form.setFieldValue(this.props.field.name, selectOption?.value);
  }

  getValueFromOptions() {
    return this.props.options.find((o: ISelectOption) => o.value === this.props.field.value);
  }

  renderRequiredMark() {
    if (!this.props.required) return null;
    return <sup>&nbsp;*</sup>;
  }

  render() {
    const value = this.getValueFromOptions();
    const {id, label, placeholder, name, colNum, disabled, className, options} = this.props;
    return (
      <Form.Group as={Col} lg={colNum} controlId={name} className={className}>
        {!!label && <Form.Label htmlFor={id}>{label}</Form.Label>}
        <Select options={options} placeholder={placeholder} classNamePrefix="react-select" value={value} onChange={this.handleChange} isDisabled={disabled} styles={dropdownStyles}/>
        <Form.Control.Feedback type="invalid" className="capitalize">{this.errorMessage()}</Form.Control.Feedback>
      </Form.Group>
    );
  }
}

const dropdownStyles: StylesConfig<ISelectOption, false> = {
  control: (provided: CSSObjectWithLabel) => ({...provided, cursor: "pointer"}),
  option: (provided: CSSObjectWithLabel, state: OptionProps<ISelectOption>) => {
    return {
      ...provided,
      cursor: "pointer",
      backgroundColor: state.isSelected ? "var(--falcon-primary) !important" : "white",
    }
  }
}