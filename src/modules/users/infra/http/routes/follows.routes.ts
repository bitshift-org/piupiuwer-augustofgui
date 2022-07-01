import { Router } from 'express';
import FollowsController from './controllers/FollowsController';
import ensureAuthenticated from './middleware/ensureAuthenticated';

const followsRouter = Router();
const followsController = new FollowsController();

followsRouter.post('/:followId', ensureAuthenticated, followsController.handle);

export default followsRouter;