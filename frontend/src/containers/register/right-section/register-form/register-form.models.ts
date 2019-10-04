import { FieldsConfig, Validator as V } from 'components/shared/form';

export type RegisterFormFields = 'username' | 'email' | 'password' | 'repeatedPassword';

export const registerFormConfig: FieldsConfig<RegisterFormFields> = {
  username: {
    validate: val => V.one(new V(val).username()),
    initValue: 'piotr1994'
  },
  email: {
    validate: val => V.one(new V(val).email()),
    initValue: 'polubik1994@gmail.com'
  },
  password: {
    connectedWith: 'repeatedPassword',
    validate: (val, { repeatedPassword: { value } }) =>
      V.one(new V(val).password().comparePasswords(value)),
    initValue: 'piotr1994'
  },
  repeatedPassword: {
    connectedWith: 'password',
    validate: (val, { password: { value } }) =>
      V.one(new V(val).password().comparePasswords(value)),
    initValue: 'piotr1994'
  }
};
