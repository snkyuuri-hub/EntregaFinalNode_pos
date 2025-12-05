import express from "express";
import userController from "../../controllers/user/userController.js";

const routerUser = express.Router();

routerUser.post("/user/register", userController.createUser);

routerUser.post("/user/login", userController.auth);

export default routerUser;