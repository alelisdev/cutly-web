import { FieldProps } from "formik";
import { IntlContext } from "react-intl";
import React, { ChangeEvent } from "react";
import { Col, Form, FormCheck } from "react-bootstrap";

interface Props extends FieldProps {
  id: string;
  name: string;
  label: string;
  className?: string;
  defaultChecked?: boolean;
}


export class PSFormCheck extends React.PureComponent<Props> {
  static contextType = IntlContext;
  context!: React.ContextType<typeof IntlContext>;

  constructor(props: Props) {
    super(props);
    this.errorMessage = this.errorMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  errorMessage() {
    const error: any = this.props.form.errors[this.props.field.name] || undefined;
    return !error ? null : this.context.formatMessage({id: error.key}, error.values);
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    this.props.form.setFieldTouched(this.props.field.name, true);
    this.props.form.setFieldValue(this.props.field.name, event.target.checked);
  }

  render() {
    const {id, label, name, field, className} = this.props;
    return (
      <Form.Group as={Col} controlId={name} className={className}>
        <FormCheck id={id} name={name} label={label} type="checkbox" className={className} checked={field.value} onChange={this.handleChange}/>
      </Form.Group>
    );
  }
}