import dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';

interface IDbBuilder {
  createConnectionOptions(): Promise<ConnectionOptions>;
}

export default class DbBuilder implements IDbBuilder {
  public async createConnectionOptions(): Promise<ConnectionOptions> {
    dotenv.config();

    const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env as any;

    return Promise.resolve({
      type: 'mysql',
      host: DB_HOST,
      port: +DB_PORT,
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      entities: [],
      synchronize: true
    });
  }
}
