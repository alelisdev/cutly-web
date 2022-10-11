import React from "react";
import { FieldProps } from "formik";
import { IntlContext } from "react-intl";
import { Col, Form, FormCheck } from "react-bootstrap";

interface Props extends FieldProps {
  id: string;
  name: string;
  label: string;
  defaultValue: any;
  className?: string;
  disabled?: boolean;
}


export class PSFormRadio extends React.PureComponent<Props> {
  static contextType = IntlContext;
  context!: React.ContextType<typeof IntlContext>;

  constructor(props: Props) {
    super(props);
    this.getValue = this.getValue.bind(this);
    this.errorMessage = this.errorMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getValue(): any {
    return this.props?.form?.values[this.props?.field?.name];
  }

  errorMessage() {
    const error: any = this.props.form.errors[this.props.field.name] || undefined;
    return !error ? null : this.context.formatMessage({id: error.key}, error.values);
  }

  handleChange() {
    this.props.form.setFieldTouched(this.props.field.name, true);
    this.props.form.setFieldValue(this.props.field.name, this.props.defaultValue);
  }

  render() {
    const value = this.getValue();
    const {id, label, name, className, defaultValue, disabled} = this.props;
    return (
      <Form.Group as={Col} controlId={name} className={className}>
        <FormCheck
          id={id}
          name={name}
          type="radio"
          label={label}
          value={defaultValue}
          disabled={disabled}
          className={className}
          onChange={this.handleChange}
          checked={value === defaultValue}
        />
      </Form.Group>
    );
  }
}