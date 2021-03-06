import express, { Request, Response, NextFunction } from 'express';

import { Forbidden, Unauthorized, BadRequest } from '../utils/exceptions';
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
  if (!req.session.passport) {
    return next(new Unauthorized('No access allowed'));
  }

  if (req.session.passport.user === undefined) {
    return next(new Unauthorized('No access allowed'));
  }

  try {
    await accountsService.deleteAccount(+req.params.id);
    req.logOut();
    parseSuccess(req, res, undefined);
  } catch (error) {
    return next(error);
  }
});

accountsController.post('/confirm', async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.confirmationLink) {
    return next(new BadRequest('Confirmation link is required'));
  }

  if (req.session.passport && req.session.passport.user !== undefined) {
    return next(new Forbidden('Account confirmation is not allowed for logged in users'));
  }

  try {
    const result = await accountsService.confirmAccount(req.body.confirmationLink);
    parseSuccess(req, res, result);
  } catch (error) {
    return next(error);
  }
});

export default accountsController;
