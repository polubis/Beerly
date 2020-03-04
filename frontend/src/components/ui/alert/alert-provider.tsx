import React, { createContext } from 'react';

import { AlertProps } from '.';

export type AlertProviderState = {
  alertProps: AlertProps;
  setAlertProps: (alertProps: AlertProps) => void;
  closeAlert: (timeout: number, animationTimeout: number) => void;
};

export const AlertProviderContext = createContext<AlertProviderState>({
  alertProps: { message: '', open: false },
  setAlertProps: () => {},
  closeAlert: () => {}
});

class AlertProvider extends React.PureComponent<any, AlertProviderState> {
  animationTimeoutRef: any;

  closeTimeoutRef: any;

  private _clearRefs = () => {
    if (this.animationTimeoutRef) {
      clearTimeout(this.animationTimeoutRef);
    }
    if (this.closeTimeoutRef) {
      clearTimeout(this.closeTimeoutRef);
    }
  };

  setAlertProps = (alertProps: AlertProps) => {
    this._clearRefs();

    if (this.state.alertProps.open) {
      this.setState({ alertProps: { ...alertProps, animationClass: 'none' } });
      setTimeout(() => {
        this.setState({ alertProps: { ...alertProps, animationClass: 'in-out' } });
      });
    } else {
      this.setState({ alertProps });
    }

    this.closeAlert(4600, 5000);
  };

  closeAlert = (animationTimeout: number, closeTimeout: number) => {
    this._clearRefs();

    this.animationTimeoutRef = setTimeout(() => {
      this.setState({
        alertProps: { ...this.state.alertProps, animationClass: 'out' }
      });
    }, animationTimeout);

    this.closeTimeoutRef = setTimeout(() => {
      this.setState({ alertProps: { message: '', open: false } });
    }, closeTimeout);
  };

  readonly state: AlertProviderState = {
    alertProps: { message: '', open: false },
    setAlertProps: this.setAlertProps,
    closeAlert: this.closeAlert
  };

  render = () => (
    <AlertProviderContext.Provider value={this.state}>
      {this.props.children}
    </AlertProviderContext.Provider>
  );
}

export default AlertProvider;
