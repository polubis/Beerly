import moment from 'moment';

import { constraints } from './constraints';

export class Validator {
  private _error: string = '';

  private setErrors(newError: string): Validator {
    this._error = this._error || newError;
    return this;
  }

  constructor(private _value: string = '') {}

  static one = (validator: Validator): string => validator._error;

  public email = () =>
    this.setErrors(!constraints.email.test(this._value) ? 'Invalid email format' : '');

  public username = () => {
    if (this._value.length < 8) {
      return this.setErrors('Miniumum length is 8');
    }

    if (this._value.length > 20) {
      return this.setErrors('Maximum length is 20');
    }

    return this.setErrors(!constraints.username.test(this._value) ? 'Invalid username format' : '');
  };

  public password = () =>
    this.setErrors(
      this._value.length < 8
        ? 'Miniumum length is 8'
        : this._value.length > 20
        ? 'Maximum length is 20'
        : ''
    );

  public compare = (valueToCompare: string, message: string) =>
    this.setErrors(this._value !== valueToCompare ? message : '');

  public age = (allowedAge = 18) => {
    const valueAsMoment = moment(this._value, 'DD-MM-YYYY');

    if (!valueAsMoment.isValid()) {
      return this.setErrors('Invalid date format');
    }

    return this.setErrors(
      moment().diff(this._value, 'years') < allowedAge
        ? `You must be atleast ${allowedAge} old`
        : ''
    );
  };
}
