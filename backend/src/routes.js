import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';
import MeetupController from './app/controllers/MeetupController';
import OrganizerController from './app/controllers/OrganizerController';

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
 * Organizer
 */

routes.use('/organizer', authMiddleware);
routes.get('/organizer', OrganizerController.index);

/*
 * Meetups
 */

routes.use('/meetups', authMiddleware);
routes.get('/meetups', MeetupController.index);
routes.post('/meetups', MeetupController.store);

routes.put('/meetups/:id', MeetupController.update);
routes.delete('/meetups/:id', MeetupController.delete);

export default routes;
