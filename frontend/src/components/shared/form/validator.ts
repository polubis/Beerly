import { constraints } from './constraints';

export class Validator {
  private _error: string = '';

  private setErrors(newError: string): Validator {
    this._error = this._error || newError;
    return this;
  }

  constructor(public _value: string = '') {}

  static one = (validator: Validator): string => validator._error;

  email = () => this.setErrors(!constraints.email.test(this._value) ? 'Invalid email format' : '');

  username = () => {
    if (this._value.length < 8) {
      return this.setErrors('Miniumum length is 8');
    }

    if (this._value.length > 20) {
      return this.setErrors('Maximum length is 20');
    }

    return this.setErrors(!constraints.username.test(this._value) ? 'Invalid username format' : '');
  };

  password = () =>
    this.setErrors(
      this._value.length < 8
        ? 'Miniumum length is 8'
        : this._value.length > 20
        ? 'Maximum length is 20'
        : ''
    );

  comparePasswords = (repeatedPassword: string) =>
    this.setErrors(
      this._value !== repeatedPassword
        ? 'Fields "Password" and "Repeated password" must be the same'
        : ''
    );
}