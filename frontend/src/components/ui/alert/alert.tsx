import React, { memo, useEffect } from 'react';

import { usePortal } from 'src/utils/usePortal';

import classes from './alert.scss';

export type AlertProps = {
  message: string;
  open: boolean;
  onClose?: () => void;
  mode?: 'error' | 'warn' | 'ok';
  timeout?: number;
};

let timeoutRef: any;

export const Alert = memo(
  ({ message, open, onClose = () => {}, mode = 'error', timeout = 5000 }: AlertProps) => {
    const { renderPortal } = usePortal();

    if (timeoutRef) {
      clearTimeout(timeoutRef);
    }

    if (open) {
      timeoutRef = setTimeout(() => {
        onClose();
      }, timeout);
    }

    useEffect(() => {
      return () => {
        if (timeoutRef) {
          clearTimeout(timeoutRef);
        }
      };
    }, []);

    return open
      ? renderPortal(
          <div
            onClick={onClose}
            className={[classes.alert, classes[`alert-${mode}`], classes['alert-animated-in']].join(
              ' '
            )}
          >
            {message}
          </div>
        )
      : null;
  }
);
