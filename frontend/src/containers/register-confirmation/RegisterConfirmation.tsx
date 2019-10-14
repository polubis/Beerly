import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

import { AccountConfirmationPayload } from 'src/api/models/payloads';
import { useApiWithAlert } from 'src/api/hooks/useAPI';

import accountsService from 'services/accounts-service';

type RegisterConfirmationLink = { link: string };

const RegisterConfirmation = ({ match }: RouteComponentProps<RegisterConfirmationLink>) => {
  const { isSending, handleApiCall } = useApiWithAlert<AccountConfirmationPayload, null>(
    accountsService.confirm,
    res => {
      console.log('siema');
    }
  );

  // TODO change way of creating account activation links
  // Add possibility to set loading flag in useAPi with alert
  // Add possibility to handle success message
  useEffect(() => {
    handleApiCall({ confirmationLink: match.params.link });
  }, []);

  return <div>{isSending ? 'Loading' : ''}</div>;
};

export default withRouter(RegisterConfirmation);
