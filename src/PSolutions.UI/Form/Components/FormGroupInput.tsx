import { FieldProps } from "formik";
import { IntlContext } from "react-intl";
import React, { ChangeEvent } from "react";
import { Col, Form, InputGroup } from "react-bootstrap";

interface Props extends FieldProps {
  type: any;
  id: string;
  name: string;
  colNum: number;
  label: string;
  suffix: string;
  className?: string;
  required: boolean;
  hideValid?: boolean;
  placeholder: string;
  disabled?: boolean | undefined
}


export class FormInputGroup extends React.PureComponent<Props> {
  static contextType = IntlContext;
  context!: React.ContextType<typeof IntlContext>;

  constructor(props: Props) {
    super(props);
    this.errorMessage = this.errorMessage.bind(this);
    this.isFieldDirty = this.isFieldDirty.bind(this);
    this.hasFieldErrors = this.hasFieldErrors.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.renderRequiredMark = this.renderRequiredMark.bind(this);
  }

  errorMessage() {
    const error: any = this.props.form.errors[this.props.field.name] || undefined;
    return !error ? null : this.context.formatMessage({id: error.key}, error.values);
  }

  isFieldDirty() {
    return !!this.props.form.touched[this.props.field.name];
  }

  hasFieldErrors() {
    return !!this.props.form.errors[this.props.field.name];
  }

  handleTextChange(event: ChangeEvent<HTMLInputElement>) {
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
    const {id, label, placeholder, name, type, field, colNum, disabled, className, hideValid} = this.props;
    return (
      <Form.Group as={Col} lg={colNum} controlId={name} className={className}>
        {!!label && <Form.Label htmlFor={id}>{label}</Form.Label>}
        <InputGroup>
          <Form.Control
            id={id}
            type={type}
            name={name}
            value={field.value}
            disabled={disabled}
            isInvalid={isInvalid}
            placeholder={placeholder}
            onChange={this.handleTextChange}
            isValid={!!hideValid ? undefined : isValid}
          />
          <InputGroup.Text id={this.props.id}>{this.props.suffix}</InputGroup.Text>
          <Form.Control.Feedback type="invalid" className="capitalize">{this.errorMessage()}</Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
    );
  }
}