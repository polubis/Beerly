import express, { Request, Response, NextFunction } from 'express';

import usersService from '../services/UsersService';
import { parseSuccess } from '../utils/response-parsers';

const usersController = express.Router();

usersController.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await usersService.getUserById(req.params.id);
    parseSuccess(req, res, result);
  } catch (error) {
    return next(error);
  }
});

export default usersController;
