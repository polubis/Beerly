import React, { Component, ChangeEvent } from 'react';

import Button from 'ui/button/button';

export type FieldState = {
  value: any;
  error: string;
};

export type FieldConfig = {
  initValue?: any;
  connectedWith?: number;
  validate?: (value: any, formState: CompoundFormState) => string;
};

export type CompoundFormState = {
  fields: FieldState[];
  errorsOccured: boolean;
  dirty: boolean;
  saving: boolean;
};

export type CompoundFormProps = {
  numberOfFields: number;
  children: JSX.Element | JSX.Element[];
  fieldsConfig: FieldConfig[];
  apiCall(state: CompoundFormState): Promise<any>;
  onSuccess: (response: any) => void;
};

class CompoundForm extends Component<CompoundFormProps, CompoundFormState> {
  private _getInitialState = (
    length: number = this.props.numberOfFields,
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

  public handleTyping = <T extends ChangeEvent<HTMLInputElement | HTMLTextAreaElement>>(
    { target: { value } }: T,
    idx: number
  ) => {
    const { fieldsConfig } = this.props;
    const { validate, connectedWith } = fieldsConfig[idx];

    const fields: FieldState[] = this.state.fields.map((field, fIdx) =>
      fIdx === idx
        ? {
            value,
            error: this.state.dirty && validate ? validate(value, this.state) : ''
          }
        : field
    );

    if (connectedWith) {
      const { validate } = fieldsConfig[connectedWith];
      fields[connectedWith].error =
        this.state.dirty && validate ? validate(fields[connectedWith].value, this.state) : '';
    }

    const checkErrorsOccured = (): boolean =>
      this.state.dirty && this.state.fields.some(field => field.error !== '');

    this.setState({ fields, errorsOccured: checkErrorsOccured() });
  };

  public handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    let errorsOccured = false;

    const fields: FieldState[] = this.state.fields.map((field, idx) => {
      const { validate } = this.props.fieldsConfig[idx];
      const error: string = validate ? validate(field.value, this.state) : '';
      errorsOccured = errorsOccured || error !== '';

      return { value: field.value, error };
    });

    this.setState({ fields, errorsOccured, dirty: true });

    if (!errorsOccured) {
      this.setState({ saving: true });

      try {
        const res = await this.props.apiCall(this.state);
        this.setState({ saving: false });
        this.props.onSuccess(res);
      } catch (err) {
        this.setState({ saving: false });
      }
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
