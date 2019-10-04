import React from 'react';

import EmailIcon from '@material-ui/icons/Email';
import PasswordIcon from '@material-ui/icons/Lock';
import UsernameIcon from '@material-ui/icons/AccountBox';

import accountsService from 'services/accounts-service';
import Button from 'ui/button/button';
import { AccountCreationPayload } from 'src/api/models/payloads/account-creation-payload';
import { registerFormConfig, RegisterFormFields } from './register-form.models';
import FormField, { useForm } from 'components/shared/form';
import { useAPI } from 'src/api/useAPI/useAPI';

import classes from './register-form.scss';

const RegisterForm = () => {
  const { handleApiCall } = useAPI<AccountCreationPayload, null>(
    accountsService.create,
    res => console.log(res.data),
    error => {
      console.log(error.message);
    }
  );

  const {
    state: { fields, errorsOccured },
    handleTyping,
    handleSubmit
  } = useForm<RegisterFormFields>(registerFormConfig, handleApiCall);

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
