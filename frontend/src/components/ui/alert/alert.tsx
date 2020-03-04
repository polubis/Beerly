import React, { memo } from 'react';

import { usePortal } from 'utils/hooks/usePortal';

import classes from './alert.scss';

export type AlertProps = {
  message: string;
  open: boolean;
  animationClass?: 'in' | 'out' | 'in-out' | 'none';
  mode?: 'error' | 'warn' | 'ok';
  onClose?: () => void;
};

export const Alert = memo(
  ({ message, open, animationClass = 'in', mode = 'error', onClose = () => {} }: AlertProps) => {
    const { renderPortal } = usePortal();

    return open
      ? renderPortal(
          <div
            onClick={onClose}
            className={[
              classes.alert,
              classes[`alert-${mode}`],
              classes[`alert-animated-${animationClass}`]
            ].join(' ')}
          >
            {message}
          </div>
        )
      : null;
  }
);
