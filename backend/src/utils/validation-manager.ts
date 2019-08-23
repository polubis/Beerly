import { isEmail } from 'validator';

import { constraints } from './constraints';

interface IValidationManager {
  validateByControllerPath: (controllerPath: string, body: any) => Promise<string>;
}

class ValidationManager implements IValidationManager {
  public validateByControllerPath = (controllerPath: string, body: any) => {
    const validators = pathToValidationMapper[controllerPath];

    if (validators !== undefined) {
      for (let i = 0; i < validators.length; i++) {
        const error: string = this[validators[i]](body[validators[i]]);

        if (error) {
          return Promise.reject(error);
        }
      }
    }

    return Promise.resolve('');
  };

  private email = (email: string | undefined) => {
    return email !== undefined
      ? isEmail(email)
        ? ''
        : 'Incorrect email format'
      : 'Email field is required';
  };

  private password = (password: string | undefined) => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 8) {
      return 'Password must have at least 8 characters';
    }
    if (password.length > 20) {
      return 'Password must have less than 20 characters';
    }

    return '';
  };

  private username = (username: string | undefined) => {
    if (!username) {
      return 'Username is required';
    }
    if (username.length < 8) {
      return 'Username must have at least 8 characters';
    }
    if (username.length > 15) {
      return 'Username must have less than 15 characters';
    }
    if (!constraints.username.test(username)) {
      return 'Invalid username format';
    }

    return '';
  };

  private dateOfBirth = (dateOfBirth: Date) => {
    if (dateOfBirth === undefined) {
      return 'Date of birth is required';
    }

    return '';
  };
}

type Validator = 'email' | 'password' | 'username' | 'dateOfBirth';

const pathToValidationMapper: { [key: string]: Validator[] } = {
  'accounts': ['username', 'password', 'email', 'dateOfBirth'],
  'auth/login': ['email', 'password']
};

export default new ValidationManager();
