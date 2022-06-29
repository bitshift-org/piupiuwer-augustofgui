import { Router } from 'express';
import FollowsController from './controllers/FollowsController';

const followsRouter = Router();
const followsController = new FollowsController();

followsRouter.post('/', followsController.create);

export default followsRouter;