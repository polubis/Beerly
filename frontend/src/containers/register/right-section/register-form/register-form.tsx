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
    state: { keys, fields, errorsOccured },
    handleTyping,
    handleSubmit
  } = useForm<RegisterFormFields>(registerFormConfig, fields => console.log(fields));

  return (
    <form className={classes['register-form']} onSubmit={handleSubmit}>
      <FormField
        title="Username"
        placeholder="Type username..."
        icon={<UsernameIcon />}
        fieldkey={keys[0]}
        onChange={handleTyping}
        {...fields.username}
      />
      <FormField
        title="Email"
        placeholder="Type email adress..."
        icon={<EmailIcon />}
        fieldkey={keys[1]}
        onChange={handleTyping}
        {...fields.email}
      />
      <FormField
        title="Password"
        placeholder="Type password..."
        icon={<PasswordIcon />}
        fieldkey={keys[2]}
        onChange={handleTyping}
        {...fields.password}
      />
      <FormField
        title="Repeated password"
        placeholder="Type repeated password..."
        icon={<PasswordIcon />}
        fieldkey={keys[3]}
        onChange={handleTyping}
        {...fields.repeatedPassword}
      />
      <Button content="Submit" disabled={errorsOccured} />
    </form>
  );
};

export default RegisterForm;
