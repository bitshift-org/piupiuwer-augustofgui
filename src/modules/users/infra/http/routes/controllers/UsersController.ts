import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateUserService from "@modules/users/services/CreateUserService";
import DeleteUserService from "@modules/users/services/DeleteUserService";

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { username, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      username,
      email,
      password,
    });

    return response.json(user);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.user;

      const deleteUser = container.resolve(DeleteUserService);

      const user = await deleteUser.execute(id);

      return response.json(user);
    } catch (err: any) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default UsersController;
