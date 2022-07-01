import ensureAuthenticated from "@modules/users/infra/http/routes/middleware/ensureAuthenticated";
import { Router } from "express";

import PiusController from "../controllers/PiusController";

const piusRouter = Router();
const piusController = new PiusController();

piusRouter.post("/create", ensureAuthenticated, piusController.create);
piusRouter.post("/edit", ensureAuthenticated, piusController.edit);
piusRouter.delete("/delete", ensureAuthenticated, piusController.delete);

export default piusRouter;
