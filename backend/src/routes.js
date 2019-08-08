import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';
import MeetupController from './app/controllers/MeetupController';

const routes = new Router();
const upload = multer(multerConfig);

/*
 * Users
 */

routes.post('/users', UserController.store);
routes.use('/users', authMiddleware);
routes.put('/users', UserController.update);

/*
 * Session
 */

routes.post('/sessions', SessionController.store);

/*
 * Files
 */

routes.use('/files', authMiddleware);
routes.post('/files', upload.single('file'), FileController.store);

/*
 * Meetups
 */

routes.use('/meetup', authMiddleware);
routes.post('/meetup', MeetupController.store);

export default routes;
