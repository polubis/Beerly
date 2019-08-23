import session from 'express-session';
import { RequestHandler, Request } from 'express';
import { ConnectionOptions } from 'typeorm';

const uuidv4 = require('uuid/v4');
const MySqlStore = require('express-mysql-session')(session);

class SessionProvider {
  public handleSession = (secret: string, dbOptions: ConnectionOptions): RequestHandler =>
    session({
      genid: (req: Request) => {
        return uuidv4();
      },
      secret,
      // store: new MySqlStore(dbOptions),
      resave: false,
      saveUninitialized: true,
      cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
      },
      name: 'authorization'
    });
}

export default new SessionProvider();
