import { Request, Response } from "express";
import { container } from "tsyringe";

import AuthenticateUserService from "@modules/users/services/AuthenticateUserService";

interface ResponseUser {
  id: string;
  username: string;
  email: string;
  password?: string;
  created_at: Date;
  updated_at: Date;
}

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authUser.execute({
      email,
      password,
    });

    const responseUser: ResponseUser = user;

    delete responseUser.password;

    return response.json({ responseUser, token });
  }
}

export default SessionsController;
