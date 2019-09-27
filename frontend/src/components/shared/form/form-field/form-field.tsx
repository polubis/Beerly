import React, { useMemo, InputHTMLAttributes } from 'react';

import classes from './form-field.scss';

export type FormFieldProps = {
  title: string;
  fieldkey: string;
  icon?: JSX.Element;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormField = ({ title, fieldkey, error, icon, ...inputProps }: FormFieldProps): JSX.Element =>
  useMemo(() => {
    return (
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

          <input id={title} data-key={fieldkey} name={title} autoComplete="off" {...inputProps} />

          <label className={classes.overlay}></label>
        </div>

        <span className={classes['validation-message']}>{error}</span>
      </section>
    );
  }, [error, inputProps.value]);

export default FormField;
