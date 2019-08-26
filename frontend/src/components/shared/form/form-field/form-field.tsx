import React, { useMemo, InputHTMLAttributes } from 'react';

import classes from './form-field.scss';

type FormFieldProps = {
  title: string;
  icon: JSX.Element | null;
} & InputHTMLAttributes<HTMLInputElement>;

export default ({ title, icon = null, ...inputConfig }: FormFieldProps) =>
  useMemo(
    () => (
      <section className={classes['form-field']}>
        <label htmlFor={title} className={classes.title}>
          {title}
        </label>

        <div className={classes['input-wrapper']}>
          {icon && (
            <label htmlFor={title} className={classes.icon}>
              {icon}
            </label>
          )}

          <input id={title} name={title} {...inputConfig} />

          <label className={classes.overlay}></label>
        </div>
      </section>
    ),
    []
  );
