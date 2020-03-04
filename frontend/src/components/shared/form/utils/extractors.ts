import { FormState, FieldsValues } from '../models/form.models';

export const extractValuesFromState = <T extends string>(
  formState: FormState<T>
): FieldsValues<T> =>
  formState.keys.reduce(
    (prev, key) => ({ ...prev, [key]: formState.fields[key].value }),
    {} as FieldsValues<T>
  );
