import { useState, useCallback } from 'react';

import { extractValuesFromState } from '../utils/extractors';
import { UseFormReturn, FieldsConfig, FieldsValues, FormState, FieldsState } from '..';

export const useForm = <T extends string>(
  fieldsConfig: FieldsConfig<T>,
  onSuccessSubmit: (fieldsValues: FieldsValues<T>) => void,
  cachedValues?: Partial<FieldsValues<T>>
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
            value: cachedValues ? (cachedValues.hasOwnProperty(key) ? cachedValues[key] : '') : '',
            error: '',
            fieldkey: key
          }
        }),
        {}
      )
    } as FormState<T>;
  }, []);

  const [state, setState] = useState<FormState<T>>(createFormState(fieldsConfig));

  const handleChange = (e: any, directKey?: T, directValue?: any): void => {
    e.persist();
    const value = directValue !== undefined ? directValue : e.target.value;
    const key = directKey ? directKey : (e.currentTarget.getAttribute('data-key') as T);

    if (!key) {
      throw new Error('data-key attribute is missing in given template');
    }

    const { validate, connectedWith } = fieldsConfig[key];

    setState(prevState => {
      const fields: FieldsState<T> = {
        ...prevState.fields,
        [key]: {
          ...prevState.fields[key],
          value,
          error: prevState.dirty && validate ? validate(value, prevState.fields) : ''
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
      onSuccessSubmit(extractValuesFromState<T>(newState));
    }
  };

  return {
    state,
    setState,
    handleChange,
    handleSubmit
  };
};