import React from 'react';

import EmailIcon from '@material-ui/icons/Email';
import PasswordIcon from '@material-ui/icons/Lock';
import UsernameIcon from '@material-ui/icons/AccountBox';

import FormField from 'components/shared/form/form-field/form-field';

import classes from './register-form.scss';

const RegisterForm = ({}) => {
  return (
    <form className={classes['register-form']}>
      <FormField
        title="Username"
        icon={<UsernameIcon />}
        placeholder="Type username"
        autoComplete="off"
      />
      <FormField
        title="Email"
        icon={<EmailIcon />}
        placeholder="Type email adress"
        autoComplete="off"
        type="email"
      />
      <FormField
        title="Password"
        icon={<PasswordIcon />}
        placeholder="Type password"
        autoComplete="off"
        type="password"
      />
      <FormField
        title="Repeated"
        icon={<PasswordIcon />}
        placeholder="Type repeated password"
        autoComplete="off"
        type="password"
      />
      <button>Next</button>
    </form>
  );
};

export default RegisterForm;
