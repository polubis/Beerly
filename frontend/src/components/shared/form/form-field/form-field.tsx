import React, { useMemo, InputHTMLAttributes } from 'react';

import classes from './form-field.scss';

export type FormFieldProps = {
  title: string;
  icon?: JSX.Element;
} & InputHTMLAttributes<HTMLInputElement>;

export default ({
  title,
  fieldkey,
  error,
  icon,
  placeholder = `Type ${title.toLowerCase()}...`,
  ...inputConfig
}: FormFieldProps & { fieldkey: string; error?: string }) =>
  useMemo(
    () => (
      <section className={classes['form-field']}>
        <label htmlFor={title} className={classes.title}>
          {title}
        </label>

        <div className={[classes['input-wrapper'], classes[`${error ? 'invalid' : ''}`]].join(' ')}>
          {icon && (
            <label htmlFor={title} className={classes.icon}>
              {icon}
            </label>
          )}

          <input
            id={title}
            data-key={fieldkey}
            name={title}
            autoComplete="off"
            placeholder={placeholder}
            {...inputConfig}
          />

          <label className={classes.overlay}></label>
        </div>

        <span className={classes['validation-message']}>{error}</span>
      </section>
    ),
    [inputConfig.value, error]
  );
