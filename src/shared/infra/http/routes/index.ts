import { Router } from "express";
import usersRouter from "@modules/users/infra/http/routes/users.routes";
import sessionsRouter from "@modules/users/infra/http/routes/sessions.routes";
import followsRouter from "@modules/users/infra/http/routes/follows.routes";
import piusRouter from "@modules/pius/infra/http/routes/pius.routes";
import likesRouter from "@modules/pius/infra/http/routes/like.routes";

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/follows', followsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/pius', piusRouter);
routes.use('/pius/likes', likesRouter);

export default routes;