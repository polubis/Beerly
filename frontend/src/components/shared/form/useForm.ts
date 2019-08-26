import { useState, useCallback } from 'react';

import { FormFieldProps } from './form-field/form-field';

export type FieldsConfig<T extends string> = {
  [S in T]: {
    initValue?: any;
    connectedWith?: T;
    validate?: (value: string, fields: Fields<T>) => string;
  } & FormFieldProps;
};

export type Fields<T extends string> = {
  [S in T]: Field;
};

export type Field = {
  value: any;
  error: string;
};

export type FormState<T extends string> = {
  keys: T[];
  fields: Fields<T>;
  dirty: boolean;
  errorsOccured: boolean;
};

export const useForm = <T extends string>(
  fieldsConfig: FieldsConfig<T>
): {
  state: FormState<T>;
  setState: (state: FormState<T>) => void;
  handleTyping: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
} => {
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
            error: ''
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
      const fields: Fields<T> = {
        ...prevState.fields,
        [key]: {
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

    setState(prevState => {
      let errorsOccured = false;

      const fields = prevState.keys.reduce(
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
        prevState.fields as Fields<T>
      );

      return {
        ...prevState,
        dirty: true,
        errorsOccured,
        fields
      };
    });
  };

  return {
    state,
    setState,
    handleTyping,
    handleSubmit
  };
};
