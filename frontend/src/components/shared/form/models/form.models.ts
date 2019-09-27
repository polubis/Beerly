export type FieldsConfig<T extends string> = {
  [S in T]: {
    initValue?: any;
    connectedWith?: T;
    validate?: (value: string, fields: FieldsState<T>) => string;
  };
};

export type FieldsState<T extends string> = {
  [S in T]: { value: any; error: string };
};

export type FieldsValues<T extends string> = {
  [S in T]: any;
};

export type FormState<T extends string> = {
  keys: T[];
  fields: FieldsState<T>;
  dirty: boolean;
  errorsOccured: boolean;
};
