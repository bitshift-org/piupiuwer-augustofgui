import { Router } from "express";
import usersRouter from "@modules/users/infra/http/routes/users.routes";
import sessionsRouter from "@modules/users/infra/http/routes/sessions.routes";
import followsRouter from "@modules/users/infra/http/routes/follows.routes";

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/follows', followsRouter);
routes.use('/sessions', sessionsRouter);

export default routes;