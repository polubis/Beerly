import React, { useMemo } from 'react';

import EmailIcon from '@material-ui/icons/Email';
import PasswordIcon from '@material-ui/icons/Lock';
import UsernameIcon from '@material-ui/icons/AccountBox';

import FormField from 'components/shared/form/form-field/form-field';
import { Validator as V } from 'components/shared/form/validator';

import CompoundForm, { FieldConfig, CompoundFormState } from './compound-form';

const RegisterForm = () => {
  const fieldsConfig: FieldConfig[] = useMemo(() => {
    return [
      { validate: val => V.one(new V(val).username()) },
      { validate: val => V.one(new V(val).email()) },
      {
        validate: (val, { fields }) =>
          V.one(new V(val).password().comparePasswords(fields[0].value))
      },
      {
        validate: (val, { fields }) =>
          V.one(new V(val).password().comparePasswords(fields[0].value))
      }
    ] as FieldConfig[];
  }, []);

  const apiCall = (snapshot: CompoundFormState) => Promise.resolve();

  const redirectToMainPage = (backendResponse: any) => {};

  return (
    <CompoundForm
      fieldsConfig={fieldsConfig}
      apiCall={apiCall}
      numberOfFields={4}
      onSuccess={redirectToMainPage}
    >
      <FormField title="Username" icon={<UsernameIcon />} />
      <FormField title="Email" icon={<EmailIcon />} />
      <FormField title="Password" icon={<PasswordIcon />} />
      <FormField title="Repeated password" icon={<PasswordIcon />} />
    </CompoundForm>
  );
};

export default RegisterForm;
