import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import './database';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import routes from './routes';
import sentryConfig from './config/sentry';
import 'express-async-errors';

class App {
  constructor() {
    this.server = express();
    Sentry.init(sentryConfig);

    this.server.use(Sentry.Handlers.requestHandler());
    this.middlewares();
    this.routes();
    this.server.use(Sentry.Handlers.errorHandler());
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(express.urlencoded({ extended: false }));
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'upload'))
    );
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
