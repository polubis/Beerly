import express, { Request, Response, NextFunction } from 'express';

import userService from '../services/UserService';
import { parseSuccess } from '../utils/response-parsers';

const userController = express.Router();

userController.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.getUserById(req.params.id);
    parseSuccess(req, res, user);
  } catch (error) {
    return next(error);
  }
});

export default userController;
