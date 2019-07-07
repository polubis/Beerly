import express, { Request, Response, NextFunction } from 'express';

import { Forbidden, Unauthorized } from '../utils/exceptions';
import { parseSuccess } from '../utils/response-parsers';
import accountsService from '../services/AccountsService';

const accountsController = express.Router();

accountsController.post('', async (req: Request, res: Response, next: NextFunction) => {
  if (req.session.passport && req.session.passport.user !== undefined) {
    return next(new Forbidden('Account creation is not allowed for logged in users'));
  }
  try {
    const result = await accountsService.createAccount(req.body);
    parseSuccess(req, res, result);
  } catch (error) {
    return next(error);
  }
});

accountsController.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.passport || +req.session.passport.user !== +req.params.id) {
    return next(new Unauthorized('No access allowed'));
  }

  try {
    await accountsService.deleteAccount(+req.params.id);
    parseSuccess(req, res, undefined);
  } catch (error) {
    return next(error);
  }
});

export default accountsController;
