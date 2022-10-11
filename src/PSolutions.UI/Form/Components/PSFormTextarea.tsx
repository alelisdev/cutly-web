import { FieldProps } from "formik";
import { Col, Form } from "react-bootstrap";
import React, { ChangeEvent } from "react";

interface Props extends FieldProps {
  type: any;
  id: string;
  name: string;
  colNum: number;
  label: string;
  rows: number;
  required: boolean;
  placeholder: string;
  disabled?: boolean | undefined
}


export class PSFormTextarea extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.isFieldDirty = this.isFieldDirty.bind(this);
    this.hasFieldErrors = this.hasFieldErrors.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.renderRequiredMark = this.renderRequiredMark.bind(this);
  }

  isFieldDirty() {
    return !!this.props.form.touched[this.props.field.name];
  }

  hasFieldErrors() {
    return !!this.props.form.errors[this.props.field.name];
  }

  handleTextChange(event: ChangeEvent<HTMLTextAreaElement>) {
    this.props.form.setFieldTouched(this.props.field.name, true);
    this.props.form.setFieldValue(this.props.field.name, event.currentTarget.value);
  }

  renderRequiredMark() {
    if (!this.props.required) return null;
    return <sup>&nbsp;*</sup>;
  }

  render() {
    const isValid = this.isFieldDirty() && !this.hasFieldErrors();
    const isInvalid = this.isFieldDirty() && this.hasFieldErrors();
    const {id, label, placeholder, rows, name, type, field, colNum, disabled} = this.props;
    return (
      <Form.Group as={Col} lg={colNum} controlId={name}>
        <Form.Label htmlFor={id}>{label}</Form.Label>
        <Form.Control
          as="textarea"
          id={id}
          rows={rows}
          name={name}
          type={type}
          isValid={isValid}
          value={field.value}
          disabled={disabled}
          isInvalid={isInvalid}
          placeholder={placeholder}
          onChange={this.handleTextChange}
        />
      </Form.Group>
    );
  }
}