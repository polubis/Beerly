export type UseFormReturn<T extends string> = {
  state: FormState<T>;
  setState: (state: FormState<T>) => void;
  handleChange: (e: any, directKey?: T, directValue?: any) => void;
  handleSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
};

export type FieldsConfig<T extends string> = {
  [S in T]: {
    connectedWith?: T;
    validate?: (value: string, fields: FieldsState<T>) => string;
  };
};

export type FieldsState<T extends string> = {
  [S in T]: { value: any; error: string; fieldkey: T };
};

export type FieldsValues<T extends string> = {
  [S in T]: any;
};

export type FormState<T extends string> = {
  fields: FieldsState<T>;
  keys: T[];
  dirty: boolean;
  errorsOccured: boolean;
};
