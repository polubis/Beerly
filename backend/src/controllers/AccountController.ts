import express, { Request, Response, NextFunction } from 'express';

import { parseSuccess } from '../utils/response-parsers';
import accountService from '../services/AccountService';

const accountController = express.Router();

accountController.get('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error) {
    return next(error);
  }
});

accountController.get('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await accountService.createAccount();

    parseSuccess(req, res, result);
  } catch (error) {
    return next(error);
  }
});

export default accountController;
