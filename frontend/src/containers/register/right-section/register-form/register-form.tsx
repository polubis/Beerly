import React, { useState } from 'react';

import accountsService from 'services/accounts-service';
import { AccountCreationPayload } from 'src/api/models/payloads/account-creation-payload';
import { FieldsValues } from 'components/shared/form';
import {
  RegisterFormFirstStepFields,
  RegisterFormSecondStepFields,
  RegisterFormStepsCache
} from './models/register-form.models';
import RegisterFormFirstStep from './steps/register-form-first-step';
import RegisterFormSecondStep from './steps/register-form-second-step';
import { useAPI } from 'src/api/useAPI/useAPI';

const RegisterForm = () => {
  const [step, setStep] = useState(0);
  const [formStepsCache, setFormStepsCache] = useState(new RegisterFormStepsCache());

  const { handleApiCall } = useAPI<AccountCreationPayload, null>(
    accountsService.create,
    res => console.log(res.data),
    error => {
      console.log(error.message);
    }
  );

  const handleFirstStepSubmit = (fields: FieldsValues<RegisterFormFirstStepFields>) => {
    setFormStepsCache(prevCache => ({ ...prevCache, 0: fields }));
    setStep(1);
  };

  const handleSecondStepSubmit = (fields: FieldsValues<RegisterFormSecondStepFields>) => {
    setFormStepsCache(prevCache => ({ ...prevCache, 1: fields }));
    handleApiCall({ ...formStepsCache[0], ...fields });
  };

  const handleBack = (fields: FieldsValues<RegisterFormSecondStepFields>) => {
    setFormStepsCache(prevCache => ({ ...prevCache, 1: fields }));
    setStep(prevStep => prevStep - 1);
  };

  switch (step) {
    case 0:
      return (
        <RegisterFormFirstStep
          onSuccessSubmit={handleFirstStepSubmit}
          cachedValues={formStepsCache[0]}
        />
      );
    case 1:
      return (
        <RegisterFormSecondStep
          onSuccessSubmit={handleSecondStepSubmit}
          onBack={handleBack}
          cachedValues={formStepsCache[1]}
        />
      );
    default:
      return null;
  }
};

export default RegisterForm;
