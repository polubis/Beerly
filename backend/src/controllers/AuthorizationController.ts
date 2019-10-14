import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';

import { Forbidden, Unauthorized } from '../utils/exceptions';
import { parseSuccess } from '../utils/response-parsers';

const authorizationController = express.Router();

authorizationController.post('/login', (req: Request, res: Response, next: NextFunction) => {
  if (req.session.passport && req.session.passport.user !== undefined) {
    return next(new Forbidden('Your session is still active'));
  }
  passport.authenticate('local', async (error: any, user: any, info: any) => {
    if (error) {
      return next(error);
    }
    req.login(user, error => {
      if (error) {
        return next(error);
      }
      parseSuccess(req, res, undefined);
    });
  })(req, res, next);
});

authorizationController.post('/logout', async (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.passport || req.session.passport.user === undefined) {
    return next(new Unauthorized('No access allowed'));
  }
  try {
    req.logOut();
    parseSuccess(req, res, undefined);
  } catch (error) {
    return next(error);
  }
});

export default authorizationController;
