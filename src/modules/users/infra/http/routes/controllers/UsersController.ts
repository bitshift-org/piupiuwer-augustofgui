import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateUserService from "@modules/users/services/CreateUserService";
import DeleteUserService from "@modules/users/services/DeleteUserService";
import GetUserProfileService from "@modules/users/services/GetUserProfileService";

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
    const { id } = request.user;

    const deleteUser = container.resolve(DeleteUserService);

    const user = await deleteUser.execute(id);

    return response.json(user);
  }

  public async getProfile(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getUser = container.resolve(GetUserProfileService);

    const user = await getUser.execute(id);

    return response.json(user);
  }

  public async getFeed(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const getUser = container.resolve(GetUserProfileService);

    const user = await getUser.execute(id);

    return response.json(user);
  }
}

export default UsersController;
