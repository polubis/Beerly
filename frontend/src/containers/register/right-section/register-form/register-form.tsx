import React, { useState } from 'react';
import { finalize } from 'rxjs/operators';

import EmailIcon from '@material-ui/icons/Email';
import PasswordIcon from '@material-ui/icons/Lock';
import UsernameIcon from '@material-ui/icons/AccountBox';

import Button from 'ui/button/button';
import { registerFormConfig, RegisterFormFields } from './register-form.models';
import FormField, { useForm, FieldsValues } from 'components/shared/form';

import accountsService from 'services/accounts-service';

import classes from './register-form.scss';

const RegisterForm = () => {
  const [isCreating, setIsCreating] = useState(false);

  const handleAccountCreation = ({
    username,
    email,
    password
  }: FieldsValues<RegisterFormFields>) => {
    if (isCreating) {
      return;
    }

    setIsCreating(true);

    accountsService
      .create({ username, email, password })
      .pipe(finalize(() => setIsCreating(false)))
      .subscribe();
  };

  const {
    state: { fields, errorsOccured },
    handleTyping,
    handleSubmit
  } = useForm<RegisterFormFields>(registerFormConfig, handleAccountCreation);

  return (
    <form className={classes['register-form']} onSubmit={handleSubmit}>
      <FormField
        autoFocus
        title="Username"
        icon={<UsernameIcon />}
        onChange={handleTyping}
        {...fields.username}
      />
      <FormField title="Email" icon={<EmailIcon />} onChange={handleTyping} {...fields.email} />
      <FormField
        title="Password"
        icon={<PasswordIcon />}
        onChange={handleTyping}
        {...fields.password}
      />
      <FormField
        title="Repeated password"
        icon={<PasswordIcon />}
        onChange={handleTyping}
        {...fields.repeatedPassword}
      />
      <Button content="Submit" disabled={errorsOccured} />
    </form>
  );
};

export default RegisterForm;
