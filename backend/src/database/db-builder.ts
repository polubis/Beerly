import { ConnectionOptions, createConnection, Connection } from 'typeorm';

import Entities from '../entities';

export default class DbBuilder {
  public connection: Connection;
  public connectionOptions: ConnectionOptions;

  constructor() {
    this.createConnectionOptions();
  }

  private createConnectionOptions(): void {
    const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env as any;
    this.connectionOptions = {
      type: 'mysql',
      host: DB_HOST,
      port: +DB_PORT,
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      entities: Entities,
      synchronize: false
    };
  }

  public createConnection = async () => {
    this.connection = await createConnection(this.connectionOptions);
  };
}