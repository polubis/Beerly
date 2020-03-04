import React from 'react';

import AlertProvider, { ConnectedAlert } from 'components/ui/alert';
import AppRoutes from './AppRoutes';

class App extends React.Component<any, any> {
  render() {
    return (
      <AlertProvider>
        <AppRoutes />
        <ConnectedAlert />
      </AlertProvider>
    );
  }
}

export default App;
