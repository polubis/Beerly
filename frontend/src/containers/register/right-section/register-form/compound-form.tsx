import React, { Component, ChangeEvent } from 'react';

import Button from 'ui/button/button';

export type FieldState = {
  value: any;
  error: string;
};

export type FieldConfig = {
  initValue?: any;
  connectedWithIdx?: number;
  validate?: (value: any, fields: FieldState[]) => string;
};

export type CompoundFormState = {
  fields: FieldState[];
  errorsOccured: boolean;
  dirty: boolean;
  saving: boolean;
};

export type CompoundFormProps = {
  children: JSX.Element | JSX.Element[];
  fieldsConfig: FieldConfig[];
  apiCall(state: CompoundFormState): Promise<any>;
  onSuccess: (response: any) => void;
};

class CompoundForm extends Component<CompoundFormProps, CompoundFormState> {
  private _getInitialState = (
    length: number = Array.isArray(this.props.children) ? this.props.children.length : 0,
    callback = (v: any, idx: number) => ({ value: '', error: '' })
  ): FieldState[] => Array.from({ length }, (v, k) => callback(v, k));

  public readonly state: CompoundFormState = {
    fields: this._getInitialState(),
    errorsOccured: false,
    dirty: false,
    saving: false
  };

  public renderFormItems = () => {
    const { children } = this.props;

    if (!children) {
      return null;
    }

    return React.Children.map(children, (child, idx) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          ...this.state.fields[idx],
          onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            this.handleTyping(e, idx)
        });
      }
    });
  };

  public handleTyping = (
    { target: { value } }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    idx: number
  ): void => {
    const { fieldsConfig } = this.props;
    const { validate, connectedWithIdx } = fieldsConfig[idx];

    const fields: FieldState[] = [...this.state.fields];
    fields[idx] = { value, error: this.state.dirty && validate ? validate(value, fields) : '' };

    if (connectedWithIdx) {
      const { validate } = fieldsConfig[connectedWithIdx];
      fields[connectedWithIdx] = {
        ...fields[connectedWithIdx],
        error:
          this.state.dirty && validate ? validate(fields[connectedWithIdx].value, fields) : ''
      };
    }

    const checkErrorsOccured = (): boolean =>
      this.state.dirty && fields.some(field => field.error !== '');

    this.setState({ fields, errorsOccured: checkErrorsOccured() });
  };

  public handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    let errorsOccured = false;

    const fields: FieldState[] = this.state.fields.map((field, idx) => {
      const { validate } = this.props.fieldsConfig[idx];
      const error: string = validate ? validate(field.value, this.state.fields) : '';
      errorsOccured = errorsOccured || error !== '';

      return { value: field.value, error };
    });

    this.setState({ fields, errorsOccured, dirty: true });

    errorsOccured || this.handleApiCall();
  };

  public handleApiCall = async () => {
    this.setState({ saving: true });
    try {
      const res = await this.props.apiCall(this.state);
      this.setState({ saving: false });
      this.props.onSuccess(res);
      console.log(res);
    } catch (err) {
      this.setState({ saving: false });
    }
  };

  render() {
    const { errorsOccured } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderFormItems()}
        <Button content="Submit" disabled={errorsOccured} />
      </form>
    );
  }
}

export default CompoundForm;
