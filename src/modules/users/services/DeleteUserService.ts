import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";
import User from "../infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUsersRepository";

@injectable()
class DeleteUserService {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<User> {
    const userFound = await this.usersRepository.findById(id);

    if (!userFound) {
      throw new AppError("An user with this id was not found.", 404);
    }

    const user = await this.usersRepository.delete(userFound);

    return user;
  }
}

export default DeleteUserService;
