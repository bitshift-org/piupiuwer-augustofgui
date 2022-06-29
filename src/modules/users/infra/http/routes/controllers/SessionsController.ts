import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateUserService from "@modules/users/services/CreateUserService";
import DeleteUserService from "@modules/users/services/DeleteUserService";
import AuthenticateUserService from "@modules/users/services/AuthenticateUserService";

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;

      const authUser = container.resolve(AuthenticateUserService);

      // const responseAuth = await authUser.execute({
      //   email,
      //   password,
      // });

      return response.json("ok");
    } catch (err: any) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default SessionsController;
