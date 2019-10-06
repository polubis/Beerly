import React, { createContext } from 'react';

import { AlertProps } from '.';

export type AlertProviderState = {
  alertProps: AlertProps;
  setAlertProps: (alertProps: AlertProps) => void;
};

export const AlertProviderContext = createContext<AlertProviderState>({
  alertProps: { message: '', open: false },
  setAlertProps: () => {}
});

class AlertProvider extends React.PureComponent<any, AlertProviderState> {
  setAlertProps = (alertProps: AlertProps) => {
    this.setState({ alertProps: { ...alertProps } });
  };

  readonly state: AlertProviderState = {
    alertProps: { message: '', open: false },
    setAlertProps: this.setAlertProps
  };

  render = () => (
    <AlertProviderContext.Provider value={this.state}>
      {this.props.children}
    </AlertProviderContext.Provider>
  );
}

export default AlertProvider;
