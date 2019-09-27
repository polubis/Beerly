export type UseFormReturn<T extends string> = {
  state: FormState<T>;
  setState: (state: FormState<T>) => void;
  handleTyping: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
};

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
  fields: FieldsState<T>;
  keys: T[];
  keysEnum: { [S in T]: T };
  dirty: boolean;
  errorsOccured: boolean;
};
