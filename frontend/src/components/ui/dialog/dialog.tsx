import React, { useEffect, useMemo, ReactPortal, ReactNode } from 'react';
import ReactDOM from 'react-dom';

import CloseIcon from '@material-ui/icons/Close';

import classes from './dialog.scss';

const dialogRoot = document.getElementById('dialog')!;

type DialogProps = {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
};

const Dialog = ({ children, open, onClose }: DialogProps): ReactPortal | null => {
  if (open) {
    const el = useMemo(() => {
      return document.createElement('div');
    }, []);

    useEffect(() => {
      dialogRoot.appendChild(el);

      return () => {
        dialogRoot.removeChild(el);
      };
    }, []);

    return ReactDOM.createPortal(
      <div className={classes.dialog__overlay}>
        {children} <CloseIcon onClick={onClose} className={classes.close} />
      </div>,
      el
    );
  }

  return null;
};

export default Dialog;
