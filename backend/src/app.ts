import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { createConnection, ConnectionOptions } from 'typeorm';

import DbBuilder from './database/db-builder';
import { parseFailure } from './utils/response-parsers';

import accountController from './controllers/AccountController';
import userController from './controllers/UserController';

export default class App {

  private async init(): Promise<Application> {
    const dbOptions: ConnectionOptions = await new DbBuilder().createConnectionOptions(); // creating connection config based env file

    await createConnection(dbOptions); // connecting to database server

    const app: Application = express();

    app.set('port', process.env.PORT || 3000);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use((req: Request, res: Response, next: NextFunction) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
      );
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
      next();
    });

    app.use('/api/user', userController);
    app.use('/api/account', accountController);

    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
      parseFailure(error, res);
    });

    return Promise.resolve(app);
  }

  public async start(): Promise<any> {
    const app = await this.init();
    const server = app.listen(app.get('port'), async () => {
      console.log(`Service running at port ${app.get('port')} in ${app.get('env')} mode`);
      console.log('Date: ', new Date().toDateString());
    });
    return Promise.resolve(server);
  }
}
