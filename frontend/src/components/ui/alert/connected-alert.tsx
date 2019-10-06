import React, { memo, useContext } from 'react';

import { Alert, AlertProviderContext } from '.';

export const ConnectedAlert = memo(() => {
  const { alertProps } = useContext(AlertProviderContext);
  return <Alert {...alertProps} />;
});
