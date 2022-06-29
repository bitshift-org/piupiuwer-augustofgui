import { Router } from 'express';

import UsersController from './controllers/UsersController';
import ensureAuthenticated from './middleware/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/', usersController.create);
usersRouter.delete('/', ensureAuthenticated, usersController.delete);

export default usersRouter;