import express from "express";
import { UserController } from "../features/user/controllers/user.controller";

const routes = [
  {
    path: "/",
    method: "post",
    controller: UserController.create,
  },
];

const userRoute = express.Router();

routes.forEach((route) => {
  userRoute[route.method](route.path, async (req, res) => {
    const response = await route.controller({
      ...req,
      auth: res.locals.auth,
    });

    res.status(response.statusCode).send(response.data);
  });
});

export { userRoute };
