import { FieldsConfig, Validator as V, FieldsValues } from 'components/shared/form';

export type RegisterFormFirstStepFields = 'username' | 'email' | 'password' | 'repeatedPassword';

export type RegisterFormSecondStepFields =
  | 'dateOfBirth'
  | 'subscriptionConfirmation'
  | 'policyConfirmation';

export class RegisterFormStepsCache {
  0: FieldsValues<RegisterFormFirstStepFields> = {
    username: '',
    email: '',
    password: '',
    repeatedPassword: ''
  };
  1: FieldsValues<RegisterFormSecondStepFields> = {
    dateOfBirth: '',
    subscriptionConfirmation: false,
    policyConfirmation: false
  };
}

export const registerFormFirstStepConfig: FieldsConfig<RegisterFormFirstStepFields> = {
  username: {
    validate: val => V.one(new V(val).username())
  },
  email: {
    validate: val => V.one(new V(val).email())
  },
  password: {
    connectedWith: 'repeatedPassword',
    validate: (val, { repeatedPassword: { value } }) =>
      V.one(
        new V(val).password().compare(value, 'Fields "Password" and "Repeated password" differs')
      )
  },
  repeatedPassword: {
    connectedWith: 'password',
    validate: (val, { password: { value } }) =>
      V.one(
        new V(val).password().compare(value, 'Fields "Password" and "Repeated password" differs')
      )
  }
};

export const registerFormSecondStepConfig: FieldsConfig<RegisterFormSecondStepFields> = {
  dateOfBirth: {
    validate: val => V.one(new V(val).age())
  },
  subscriptionConfirmation: {},
  policyConfirmation: {
    validate: val => (val ? '' : 'You must accept terms of use')
  }
};
