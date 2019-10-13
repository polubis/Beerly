import React, { ReactNode } from 'react';

import { usePortal } from 'utils/hooks/usePortal';

import classes from './modal.scss';

export type ModalProps = {
  open: boolean;
  children: ReactNode;
};

const Modal = ({ open, children }: ModalProps) => {
  const { renderPortal } = usePortal();

  const modalBody = <div className={classes['modal-wrapper']}>{children}</div>;

  return open ? renderPortal(modalBody) : null;
};

export default Modal;
