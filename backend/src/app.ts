import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import DbBuilder from './database/db-builder';
import SessionProvider from './database/session-provider';
import payloadValidation from './middleware/payload-validation';
import { parseFailure } from './utils/response-parsers';

import accountsController from './controllers/AccountsController';
import authorizationController from './controllers/AuthorizationController';
import usersController from './controllers/UsersController';
import accountsService from './services/AccountsService';
import { BadRequest } from './utils/exceptions';

export default class App {
  private async init(): Promise<Application> {
    passport.use(
      new LocalStrategy(
        { usernameField: 'email' },
        async (email: string, password: string, done) => {
          const user = await accountsService.getAccount(email);
          if (!user) {
            return done(new BadRequest('Invalid authorization credentials'));
          }

          const isAuthorized = await accountsService.checkPassword(password, user.password);

          if (!isAuthorized) {
            return done(new BadRequest('Invalid authorization credentials'));
          }

          return done(undefined, user);
        }
      )
    );

    passport.serializeUser((user: any, done) => {
      return done(undefined, user.id);
    });

    passport.deserializeUser((id: number, done) => {
      return done(undefined, id);
    });

    const db = new DbBuilder();
    db.createConnection();

    const app: Application = express();

    app.set('port', process.env.PORT || 3000);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(SessionProvider.handleSession(process.env.SESSION_SECRET, db.connectionOptions));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use((req: Request, res: Response, next: NextFunction) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
      );
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
      next();
    });

    app.use(payloadValidation);

    app.use('/api/accounts', accountsController);
    app.use('/api/auth', authorizationController);
    app.use('/api/users', usersController);

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
