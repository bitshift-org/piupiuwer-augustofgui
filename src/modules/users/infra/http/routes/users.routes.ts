import { Router } from 'express';

import UsersController from './controllers/UsersController';
import ensureAuthenticated from './middleware/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/create', usersController.create);
usersRouter.delete('/delete', ensureAuthenticated, usersController.delete);
usersRouter.get('/profile/:id', ensureAuthenticated, usersController.getProfile);
usersRouter.get("/feed", ensureAuthenticated, usersController.getFeed)

export default usersRouter;