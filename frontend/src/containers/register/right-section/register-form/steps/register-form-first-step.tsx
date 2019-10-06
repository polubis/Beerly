import React from 'react';

import EmailIcon from '@material-ui/icons/Email';
import PasswordIcon from '@material-ui/icons/Lock';
import UsernameIcon from '@material-ui/icons/AccountBox';

import Button from 'ui/button/button';
import FormField, { useForm, FieldsValues } from 'components/shared/form';
import {
  RegisterFormFirstStepFields,
  registerFormFirstStepConfig
} from '../models/register-form.models';

import classes from './register-form-steps.scss';

type RegisterFormFirstStep = {
  onSuccessSubmit: (fields: FieldsValues<RegisterFormFirstStepFields>) => void;
  cachedValues: FieldsValues<RegisterFormFirstStepFields>;
};

const RegisterFormFirstStep = ({ onSuccessSubmit, cachedValues }: RegisterFormFirstStep) => {
  const {
    state: { fields, errorsOccured },
    handleChange,
    handleSubmit
  } = useForm<RegisterFormFirstStepFields>(registerFormFirstStepConfig, onSuccessSubmit, {
    username: 'piotr1994',
    email: 'polubik1994@gmail.com',
    password: 'piotr1994',
    repeatedPassword: 'piotr1994'
  });

  return (
    <>
      <h3>Sign up</h3>
      <form
        className={[classes['register-form'], classes['register-form-first-step']].join(' ')}
        onSubmit={handleSubmit}
      >
        <FormField
          autoFocus
          title="Username *"
          icon={<UsernameIcon />}
          onChange={handleChange}
          {...fields.username}
        />
        <FormField
          title="Email *"
          type="email"
          icon={<EmailIcon />}
          onChange={handleChange}
          {...fields.email}
        />
        <FormField
          title="Password *"
          type="password"
          icon={<PasswordIcon />}
          onChange={handleChange}
          {...fields.password}
        />
        <FormField
          title="Repeated password *"
          type="password"
          icon={<PasswordIcon />}
          onChange={handleChange}
          {...fields.repeatedPassword}
        />
        <Button content="Submit" disabled={errorsOccured} />
      </form>
    </>
  );
};

export default RegisterFormFirstStep;
