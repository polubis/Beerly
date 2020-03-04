import { Request, Response, NextFunction } from 'express';

import validationManager from '../utils/validation-manager';
import { restFailureResponseCodes } from '../utils/response-codes';

export default async ({ path, body }: Request, res: Response, next: NextFunction) => {
  try {
    await validationManager.validateByControllerPath(path.replace('/api/', ''), body);
    next();
  } catch (error) {
    res.status(restFailureResponseCodes.BAD_REQUEST).json({
      error
    });
  }
};
