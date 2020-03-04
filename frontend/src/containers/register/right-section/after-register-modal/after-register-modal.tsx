import React from 'react';

import Button from 'ui/button/button';
import Modal from 'components/ui/modal/modal';

import classes from './after-register-modal.scss';

type AfterRegisterModalProps = {
  isAfterRegisterModalOpen: boolean;
  onCloseAfterRegisterModal: () => void;
};

const AfterRegisterModal = ({
  isAfterRegisterModalOpen,
  onCloseAfterRegisterModal
}: AfterRegisterModalProps) => {
  return (
    <Modal open={isAfterRegisterModalOpen} onClose={onCloseAfterRegisterModal}>
      <div className={classes['after-register-modal']}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="92.595"
          height="102.878"
          viewBox="0 0 92.595 102.878"
        >
          <g transform="translate(-615 -17.951)">
            <path
              d="M64.008,200.012h3.428v3.429H64.008Zm0,0"
              transform="translate(564.71 -139.193)"
              fill="#3f3d56"
            />
            <path
              d="M104,216.012h3.429v3.429H104Zm0,0"
              transform="translate(533.287 -151.764)"
              fill="#3f3d56"
            />
            <path
              d="M144,200.012h3.429v3.429H144Zm0,0"
              transform="translate(501.86 -139.193)"
              fill="#3f3d56"
            />
            <path
              d="M72.008,248.008h3.428v3.429H72.008Zm0,0"
              transform="translate(558.424 -176.902)"
              fill="#3f3d56"
            />
            <path
              d="M86.863,24.02a6.858,6.858,0,1,0,6.859,6.858A6.858,6.858,0,0,0,86.863,24.02Zm0,10.287a3.429,3.429,0,1,1,3.429-3.428A3.429,3.429,0,0,1,86.863,34.306Zm0,0"
              transform="translate(552.142 -0.921)"
              fill="#3f3d56"
            />
            <path
              d="M5.152.02A5.144,5.144,0,1,0,10.3,5.163,5.144,5.144,0,0,0,5.152.02Zm0,6.858A1.715,1.715,0,1,1,6.866,5.163,1.715,1.715,0,0,1,5.152,6.878Zm0,0"
              transform="translate(614.992 17.935)"
              fill="#3f3d56"
            />
            <path
              d="M118.843,7.034a1.715,1.715,0,0,0-1.535-1.878c-.06-.006-.121-.008-.18-.008h-.244A6.858,6.858,0,0,0,110.27,0h-5.144a6.815,6.815,0,0,0-5.143,2.369,6.788,6.788,0,0,0-9.572-.727c-.129.11-.253.225-.373.345A8.534,8.534,0,0,0,76.727,5.148h-.5A1.715,1.715,0,0,0,74.5,6.854c0,.059,0,.12.009.18L76,22.293H41.688a1.715,1.715,0,0,0-1.506.893L38.758,25.8A43.268,43.268,0,0,0,53.69,83.261v9.329H48.546a5.143,5.143,0,1,0,0,10.287H70.835a5.143,5.143,0,1,0,0-10.287H63.977V83.247A43.3,43.3,0,0,0,80.148,64.785L82.7,90.976a2.7,2.7,0,0,1-.587,1.914L78.584,97.3a3.429,3.429,0,0,0,2.677,5.573h30.584a3.429,3.429,0,0,0,2.678-5.571l-3.532-4.416A2.688,2.688,0,0,1,110.4,91Zm-13.717-3.6h5.144a3.417,3.417,0,0,1,2.953,1.715H102.174a3.417,3.417,0,0,1,2.952-1.715Zm-20.575,0a5.146,5.146,0,0,1,4.232,2.229,1.715,1.715,0,0,0,2.97-.247,3.4,3.4,0,0,1,6.092-.171,1.689,1.689,0,0,0-1.291,1.618v5.144a1.715,1.715,0,0,1-3.429,0,1.715,1.715,0,0,0-3.429,0V17.15a1.715,1.715,0,0,1-3.429,0V6.863a1.715,1.715,0,0,0-1.715-1.715h-3.8a5.1,5.1,0,0,1,3.8-1.715ZM82.837,8.577V17.15a5.144,5.144,0,1,0,10.288,0v-.293a5.145,5.145,0,0,0,6.859-4.85V8.577h15.259l-1.558,15.431H79.615l-1.5-15.431Zm-41.07,18.86.939-1.715H74.919l1.523,3.045c.064.126.108.257.172.384H40.889q.417-.858.878-1.715Zm-2.349,5.144H78.1c.429,1.134.81,2.278,1.13,3.428H38.3c.319-1.15.686-2.3,1.114-3.428ZM62.043,80.417l-.7.44a1.713,1.713,0,0,0-.8,1.447v12a1.715,1.715,0,0,0,1.715,1.715h8.572a1.715,1.715,0,0,1,0,3.429H48.546a1.715,1.715,0,1,1,0-3.429H55.4A1.715,1.715,0,0,0,57.119,94.3v-12a1.714,1.714,0,0,0-.831-1.469,39.841,39.841,0,0,1-18.77-41.395H80.039a39.813,39.813,0,0,1-18,40.978Zm46.271,14.617,3.532,4.415H81.261l3.532-4.415a6.149,6.149,0,0,0,1.325-4.36L82.837,57.108a43.233,43.233,0,0,0-2.8-28.746l-.084-.924h33.389L106.985,90.7a6.134,6.134,0,0,0,1.329,4.329Zm0,0"
              transform="translate(588.744 17.951)"
              fill="#3f3d56"
            />
            <path
              d="M288,424h17.145v3.429H288Zm0,0"
              transform="translate(388.729 -315.177)"
              fill="#3f3d56"
            />
            <path
              d="M359.992,144.016h3.429v15.431h-3.429Zm0,0"
              transform="translate(332.164 -95.198)"
              fill="#3f3d56"
            />
            <path
              d="M359.992,232.012h3.429v3.428h-3.429Zm0,0"
              transform="translate(332.164 -164.335)"
              fill="#3f3d56"
            />
          </g>
        </svg>

        <h5>
          Hello <b>Piotr</b>
        </h5>

        <span className={classes.description}>
          Your account is almost ready for use. All you have to do is confirm the registration by
          clicking the activation link sent to your email address.
        </span>

        <div className={classes.divider} />

        <span className={classes.description}>
          After activation log in to your account and start your adventure with our service.
        </span>

        <Button content="Ok" onClick={onCloseAfterRegisterModal} />
      </div>
    </Modal>
  );
};

export default AfterRegisterModal;
