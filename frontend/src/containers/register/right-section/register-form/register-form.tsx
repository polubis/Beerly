import React, { useMemo } from 'react';

import EmailIcon from '@material-ui/icons/Email';
import PasswordIcon from '@material-ui/icons/Lock';
import UsernameIcon from '@material-ui/icons/AccountBox';

import Button from 'ui/button/button';
import FormField from 'components/shared/form/form-field/form-field';
import { Validator as V } from 'components/shared/form/validator';
import { FieldsConfig, useForm } from 'components/shared/form/useForm';

import classes from './register-form.scss';

type RegisterFormFields = 'username' | 'email' | 'password' | 'repeatedPassword';

const RegisterForm = () => {
  const config = useMemo(() => {
    return {
      username: {
        title: 'Username',
        icon: <UsernameIcon />,
        autoFocus: true,
        validate: val => V.one(new V(val).username())
      },
      email: {
        title: 'Email',
        icon: <EmailIcon />,
        validate: val => V.one(new V(val).email())
      },
      password: {
        title: 'Password',
        icon: <PasswordIcon />,
        connectedWith: 'repeatedPassword',
        validate: (val, { repeatedPassword: { value } }) =>
          V.one(new V(val).password().comparePasswords(value))
      },
      repeatedPassword: {
        title: 'Repeated password',
        icon: <PasswordIcon />,
        connectedWith: 'password',
        validate: (val, { password: { value } }) =>
          V.one(new V(val).password().comparePasswords(value))
      }
    } as FieldsConfig<RegisterFormFields>;
  }, []);

  const {
    state: { keys, fields, errorsOccured },
    handleTyping,
    handleSubmit
  } = useForm<RegisterFormFields>(config, () => {});

  return (
    <form className={classes['register-form']} onSubmit={handleSubmit}>
      {keys.map(key => (
        <FormField
          key={key}
          fieldkey={key}
          onChange={handleTyping}
          icon={config[key].icon}
          title={config[key].title}
          autoFocus={config[key].autoFocus}
          {...fields[key]}
        />
      ))}
      <Button content="Submit" disabled={errorsOccured} />
    </form>
  );
};

export default RegisterForm;
