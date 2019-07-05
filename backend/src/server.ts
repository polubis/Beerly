import 'reflect-metadata';
import App from './app';

process.on('uncaughtException', (err: any) => {
  console.error(`
  --------------------
  Unhandled Exception:
  ${err.message}
  --------------------
  `);
});

process.on('unhandledRejection', (err: any) => {
  console.error(`
  --------------------
  Unhandled Rejection:
  ${err.message}
  --------------------
  `);
});

module.exports = new App().start();
