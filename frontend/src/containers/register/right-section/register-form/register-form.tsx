import React, { useState, useCallback } from 'react';

import accountsService from 'services/accounts-service';

import { AccountCreationPayload } from 'src/api/models/payloads/account-creation-payload';
import AfterRegisterModal from '../after-register-modal/after-register-modal';
import Loader from 'ui/loader/loader';
import { FieldsValues } from 'components/shared/form';
import {
  RegisterFormFirstStepFields,
  RegisterFormSecondStepFields,
  RegisterFormStepsCache
} from './register-form.models';
import RegisterFormFirstStep from './steps/register-form-first-step';
import RegisterFormSecondStep from './steps/register-form-second-step';
import { useApiWithAlert } from 'src/api/hooks/useAPI';

const RegisterForm = () => {
  const [step, setStep] = useState(0);
  const [formStepsCache, setFormStepsCache] = useState(new RegisterFormStepsCache());
  const [isAfterRegisterModalOpen, setIsAfterRegisterModalOpen] = useState(false);

  const { isSending, handleApiCall } = useApiWithAlert<AccountCreationPayload, null>(
    accountsService.create,
    res => setIsAfterRegisterModalOpen(true),
    undefined,
    { responseDelay: 4000 }
  );

  const handleFirstStepSubmit = (fields: FieldsValues<RegisterFormFirstStepFields>) => {
    setFormStepsCache(prevCache => ({ ...prevCache, 0: fields }));
    setStep(1);
  };

  const handleSecondStepSubmit = (fields: FieldsValues<RegisterFormSecondStepFields>) => {
    handleApiCall({ ...formStepsCache[0], ...fields });
  };

  const handleBack = (fields: FieldsValues<RegisterFormSecondStepFields>) => {
    setFormStepsCache(prevCache => ({ ...prevCache, 1: fields }));
    setStep(prevStep => prevStep - 1);
  };

  const closeAfterRegisterModal = useCallback(() => {
    setIsAfterRegisterModalOpen(false);
  }, []);

  return (
    <>
      {isSending && <Loader overlayed />}

      {step === 0 ? (
        <RegisterFormFirstStep
          onSuccessSubmit={handleFirstStepSubmit}
          cachedValues={formStepsCache[0]}
        />
      ) : (
        <RegisterFormSecondStep
          onSuccessSubmit={handleSecondStepSubmit}
          onBack={handleBack}
          cachedValues={formStepsCache[1]}
        />
      )}

      <AfterRegisterModal
        onCloseAfterRegisterModal={closeAfterRegisterModal}
        isAfterRegisterModalOpen={isAfterRegisterModalOpen}
      />
    </>
  );
};

export default RegisterForm;
