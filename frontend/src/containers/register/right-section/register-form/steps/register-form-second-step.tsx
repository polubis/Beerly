import React from 'react';

import DateRangeIcon from '@material-ui/icons/DateRange';

import Button from 'ui/button/button';
import Checkbox from 'ui/checkbox/checkbox';
import FormField, { useForm, FieldsValues, extractValuesFromState, ValidationStrategy } from 'components/shared/form';
import {
  registerFormSecondStepConfig,
  RegisterFormSecondStepFields
} from '../models/register-form.models';

import classes from './register-form-steps.scss';

type RegisterFormSecondStepProps = {
  onSuccessSubmit: (fields: FieldsValues<RegisterFormSecondStepFields>) => void;
  onBack: (fields: FieldsValues<RegisterFormSecondStepFields>) => void;
  cachedValues: FieldsValues<RegisterFormSecondStepFields>;
};

const RegisterFormSecondStep = ({
  onSuccessSubmit,
  onBack,
  cachedValues
}: RegisterFormSecondStepProps) => {
  const { state, handleChange, handleSubmit } = useForm<RegisterFormSecondStepFields>(
    registerFormSecondStepConfig,
    onSuccessSubmit,
    cachedValues,
    ValidationStrategy.AfterSubmit
  );

  const { fields, errorsOccured } = state;

  return (
    <>
      <h3 onClick={() => onBack(extractValuesFromState(state))}>Review and confirm</h3>

      <form
        className={[classes['register-form'], classes['register-form-second-step']].join(' ')}
        onSubmit={handleSubmit}
      >
        <FormField
          autoFocus
          type="date"
          title="Date of birth *"
          icon={<DateRangeIcon />}
          onChange={handleChange}
          {...fields.dateOfBirth}
        />

        <section className={classes.promotions}>
          <Checkbox
            id="promotions-events-checkbox"
            checked={fields.subscriptionConfirmation.value}
            data-key={fields.subscriptionConfirmation.fieldkey}
            onClick={e =>
              handleChange(
                e,
                fields.subscriptionConfirmation.fieldkey,
                !fields.subscriptionConfirmation.value
              )
            }
          />
          <span>
            Opt in for the latest promotions and events. You may unsubscribe after account creation
            in any time. Your privacy is important for us.
          </span>
        </section>

        <span className={classes.divider} />

        <section className={classes.policy}>
          <Checkbox
            id="policy-checkbox"
            checked={fields.policyConfirmation.value}
            data-key={fields.policyConfirmation.fieldkey}
            onClick={e =>
              handleChange(e, fields.policyConfirmation.fieldkey, !fields.policyConfirmation.value)
            }
          />
          <span>* By checking here and continuing, I agree to the Beerly terms of Use.</span>
        </section>

        <Button content="Create account" disabled={errorsOccured} />
      </form>
    </>
  );
};

export default RegisterFormSecondStep;
