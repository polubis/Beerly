import { useState, useCallback } from 'react';

import { UseFormReturn, FieldsConfig, FieldsValues, FormState, FieldsState } from '..';

export const useForm = <T extends string>(
  fieldsConfig: FieldsConfig<T>,
  onSuccessSubmit: (fieldsValues: FieldsValues<T>) => void
): UseFormReturn<T> => {
  const createFormState = useCallback((fieldsConfig: FieldsConfig<T>): FormState<T> => {
    const keys = Object.keys(fieldsConfig);

    return {
      dirty: false,
      errorsOccured: false,
      keys,
      fields: keys.reduce(
        (state, key) => ({
          ...state,
          [key]: {
            value: fieldsConfig[key].initValue || '',
            error: '',
            fieldkey: key
          }
        }),
        {}
      )
    } as FormState<T>;
  }, []);

  const [state, setState] = useState<FormState<T>>(createFormState(fieldsConfig));

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    e.persist();
    const key = e.currentTarget.getAttribute('data-key') as T;
    const { validate, connectedWith } = fieldsConfig[key];

    setState(prevState => {
      const fields: FieldsState<T> = {
        ...prevState.fields,
        [key]: {
          ...prevState.fields[key],
          value: e.target.value,
          error: prevState.dirty && validate ? validate(e.target.value, prevState.fields) : ''
        }
      };

      if (connectedWith) {
        const { validate } = fieldsConfig[connectedWith];
        fields[connectedWith].error =
          prevState.dirty && validate ? validate(fields[connectedWith].value, fields) : '';
      }

      const checkErrorsOccured = () =>
        prevState.dirty && prevState.keys.some(k => fields[k].error !== '');

      return { ...prevState, fields, errorsOccured: checkErrorsOccured() };
    });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    let errorsOccured = false;

    const fields = state.keys.reduce(
      (currentFields, key) => {
        const { validate } = fieldsConfig[key];
        const error: string = validate ? validate(currentFields[key].value, currentFields) : '';
        errorsOccured = errorsOccured || error !== '';

        return {
          ...currentFields,
          [key]: {
            ...currentFields[key],
            error
          }
        };
      },
      state.fields as FieldsState<T>
    );

    const newState = {
      ...state,
      dirty: true,
      errorsOccured,
      fields
    };

    setState(newState);

    if (!errorsOccured) {
      const fieldsValues = newState.keys.reduce((prev, key) => {
        return { ...prev, [key]: newState.fields[key].value };
      }, {});

      onSuccessSubmit(fieldsValues as FieldsValues<T>);
    }
  };

  return {
    state,
    setState,
    handleTyping,
    handleSubmit
  };
};
