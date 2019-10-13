import React from 'react';

import EmailIcon from '@material-ui/icons/Email';
import PasswordIcon from '@material-ui/icons/Lock';
import UsernameIcon from '@material-ui/icons/AccountBox';

import Button from 'ui/button/button';
import FormField, { useForm, FieldsValues, ValidationStrategy } from 'components/shared/form';
import {
  RegisterFormFirstStepFields,
  registerFormFirstStepConfig
} from '../register-form.models';

import classes from './register-form-steps.scss';

type RegisterFormFirstStepProps = {
  onSuccessSubmit: (fields: FieldsValues<RegisterFormFirstStepFields>) => void;
  cachedValues: FieldsValues<RegisterFormFirstStepFields>;
};

const RegisterFormFirstStep = ({ onSuccessSubmit, cachedValues }: RegisterFormFirstStepProps) => {
  const {
    state: { fields, errorsOccured },
    handleChange,
    handleSubmit
  } = useForm<RegisterFormFirstStepFields>(
    registerFormFirstStepConfig,
    onSuccessSubmit,
    {
      username: 'polubik1994',
      email: 'polubik1994@gmail.com',
      password: 'example-password1994',
      repeatedPassword: 'example-password1994'
    },
    ValidationStrategy.AfterSubmit
  );

  return (
    <>
      <h3>Sign up</h3>
      <form className={[classes['register-form']].join(' ')} onSubmit={handleSubmit}>
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
