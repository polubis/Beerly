export const restSuccessResponseCodes: { [key: string]: number } = {
  GET: 200,
  POST: 201,
  PUT: 202,
  PATCH: 203,
  DELETE: 204
};

export const restFailureResponseCodes = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_ERROR: 500
};
