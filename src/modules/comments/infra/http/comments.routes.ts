import ensureAuthenticated from "@modules/users/infra/http/routes/middleware/ensureAuthenticated";
import { Router } from "express";
import CommentsController from "./controllers/CommentsController";

const commentsRouter = Router();
const commentsController = new CommentsController();

commentsRouter.post("/create", ensureAuthenticated, commentsController.create);
commentsRouter.delete("/delete", ensureAuthenticated, commentsController.delete);

export default commentsRouter;
