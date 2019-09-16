import React, { useMemo, InputHTMLAttributes } from 'react';

import classes from './form-field.scss';

export type FormFieldProps = {
  title?: string;
  icon?: JSX.Element;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default ({
  title,
  error,
  icon,
  placeholder = `Type your ${title}...`,
  ...inputConfig
}: FormFieldProps) =>
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
