import ensureAuthenticated from "@modules/users/infra/http/routes/middleware/ensureAuthenticated";
import { Router } from "express";

import LikesController from "../controllers/LikesController";

const likesRouter = Router();
const likesController = new LikesController();

likesRouter.post("/handle", ensureAuthenticated, likesController.handle);

export default likesRouter;
