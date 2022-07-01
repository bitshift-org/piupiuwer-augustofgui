import { Router } from 'express';
import FollowsController from './controllers/FollowsController';

import UsersController from './controllers/UsersController';
import ensureAuthenticated from './middleware/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/create', usersController.create);
usersRouter.delete('/delete', ensureAuthenticated, usersController.delete);

export default usersRouter;