import { FieldsConfig } from 'components/shared/form/models/form.models';
import { Validator as V } from 'components/shared/form/utils/validator';

export type RegisterFormFields = 'username' | 'email' | 'password' | 'repeatedPassword';

export const registerFormConfig: FieldsConfig<RegisterFormFields> = {
  username: {
    validate: val => V.one(new V(val).username())
  },
  email: {
    validate: val => V.one(new V(val).email())
  },
  password: {
    connectedWith: 'repeatedPassword',
    validate: (val, { repeatedPassword: { value } }) =>
      V.one(new V(val).password().comparePasswords(value))
  },
  repeatedPassword: {
    connectedWith: 'password',
    validate: (val, { password: { value } }) => V.one(new V(val).password().comparePasswords(value))
  }
};