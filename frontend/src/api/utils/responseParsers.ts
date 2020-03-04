import { NoInternetError, ServerError, ParsedError } from '../models/api-errors';
import { ErrorResponse } from '../models/responses/error-response';

export const parseError = (error?: ErrorResponse): ParsedError => {
  if (!error || !error.response) {
    return new NoInternetError();
  }

  return new ServerError(error.response.status, error.response.data.error);
};
