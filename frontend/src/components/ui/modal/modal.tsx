import React, { ReactNode } from 'react';

import CloseIcon from '@material-ui/icons/Close';

import { usePortal } from 'utils/hooks/usePortal';

import classes from './modal.scss';

export type ModalProps = {
  open: boolean;
  children: ReactNode;
  onClose: () => void;
};

const Modal = ({ open, children, onClose }: ModalProps) => {
  const { renderPortal } = usePortal();

  const modalBody = (
    <div className={classes['modal-wrapper']}>
      <div className={classes['modal-content']}>
        <CloseIcon onClick={onClose} className={classes['close-icon']} />
        {children}
      </div>
    </div>
  );

  return open ? renderPortal(modalBody) : null;
};

export default Modal;
