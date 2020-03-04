import React, { useContext } from 'react';

import { Alert, AlertProviderContext } from '.';

export const ConnectedAlert = () => {
  const { alertProps } = useContext(AlertProviderContext);
  return <Alert {...alertProps} />;
};
