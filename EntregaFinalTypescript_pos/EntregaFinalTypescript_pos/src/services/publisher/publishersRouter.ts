import { Router } from "express";
import publishersController from "../../controllers/publishersController";
import auth from "../../middleware/auth";
import authAdmin from "../middleware/authAdmin";

const publishersRouter: Router = Router();

publishersRouter.post("/publishers", auth, publishersController.create);

publishersRouter.post("/publishers/notify", publishersController.notify);

publishersRouter.get("/publishers/all", authAdmin, publishersController.getAllPublishers);
publishersRouter.get("/publishers/:reference", authAdmin, publishersController.getPublisher);
publishersRouter.patch("/publishers/:id", authAdmin, publishersController.updatePublisher);

export default publishersRouter;