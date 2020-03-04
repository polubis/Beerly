export abstract class Error {
  abstract status: number;
  abstract message: string;
}

export class NoInternetError extends Error {
  status = 0;
  message = 'No server response';
}

export class ServerError extends Error {
  constructor(public status: number, public message: string) {
    super();
  }
}

export type ParsedError = NoInternetError | ServerError;
