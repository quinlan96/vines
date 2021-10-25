import express, { Request, Response, NextFunction } from 'express';
import createError, { HttpError } from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import config from 'config';

import db from './lib/db';
import indexRouter from './routes/index';
import apiRouter from './routes/api';

db()
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.log(err);
    console.log('Database not connected');
  });

const app = express();

app.use(logger('dev'));
app.use(express.json({ limit: '50mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/static', express.static(config.get('storagePath')));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404, 'Page not found'));
});

// error handler
app.use((
  err: HttpError,
  req: Request,
  res: Response,
  // eslint-disable-next-line
  next: NextFunction
) => {
  // set locals, only providing error in development
  // res.locals.message = err.message
  // res.locals.error = req.app.get('env') === 'development' ? err : {}

  // return the error
  res.status(err.status || 500);
  res.json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
});

export default app;
