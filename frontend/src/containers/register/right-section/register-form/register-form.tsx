import React from 'react';
import EmailIcon from '@material-ui/icons/Email';
import PasswordIcon from '@material-ui/icons/Lock';
import UsernameIcon from '@material-ui/icons/AccountBox';

import Button from 'ui/button/button';
import { registerFormConfig, RegisterFormFields } from './register-form.models';
import FormField, { useForm } from 'components/shared/form';

import classes from './register-form.scss';

const RegisterForm = () => {
  const {
    state: { keysEnum, fields, errorsOccured },
    handleTyping,
    handleSubmit
  } = useForm<RegisterFormFields>(registerFormConfig, fields => console.log(fields));

  return (
    <form className={classes['register-form']} onSubmit={handleSubmit}>
      <FormField
        autoFocus
        title="Username"
        placeholder="Type username..."
        icon={<UsernameIcon />}
        fieldkey={keysEnum.username}
        onChange={handleTyping}
        {...fields.username}
      />
      <FormField
        title="Email"
        placeholder="Type email adress..."
        icon={<EmailIcon />}
        fieldkey={keysEnum.email}
        onChange={handleTyping}
        {...fields.email}
      />
      <FormField
        title="Password"
        placeholder="Type password..."
        icon={<PasswordIcon />}
        fieldkey={keysEnum.password}
        onChange={handleTyping}
        {...fields.password}
      />
      <FormField
        title="Repeated password"
        placeholder="Type repeated password..."
        icon={<PasswordIcon />}
        fieldkey={keysEnum.repeatedPassword}
        onChange={handleTyping}
        {...fields.repeatedPassword}
      />
      <Button content="Submit" disabled={errorsOccured} />
    </form>
  );
};

export default RegisterForm;
