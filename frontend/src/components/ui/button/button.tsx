import React, { useMemo, ButtonHTMLAttributes } from 'react';

import classes from './button.scss';

type ButtonProps = {
  content: string | JSX.Element;
  variant?: 'circled' | 'default' | 'outlined-red-white';
  animation?: 'background' | 'none';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default ({
  content,
  variant = 'default',
  animation = 'background',
  ...btnConfig
}: ButtonProps) =>
  useMemo(
    () => (
      <button
        {...btnConfig}
        className={[
          classes.btn,
          classes[`btn-${variant}`],
          classes[`btn-animated-${animation}`]
        ].join(' ')}
      >
        <span>{content}</span>
      </button>
    ),
    [btnConfig.disabled]
  );
