import express, { Application } from 'express';
import bodyParser from 'body-parser';

export default class App {
  private async init() {
    const app: Application = express();

    app.set('port', process.env.PORT || 3000);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    return Promise.resolve(app);
  }

  public async start() {
    const app = await this.init();
    const server = app.listen(app.get('port'), async () => {
      console.log(`Service running at port ${app.get('port')} in ${app.get('env')} mode`);
      console.log('Date: ', new Date().toDateString());
    });
    return Promise.resolve(server);
  }
}
