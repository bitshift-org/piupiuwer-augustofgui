import AppError from "../../../shared/errors/AppError";
import User from "../infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUsersRepository";

class DeleteUserService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute(id: string): Promise<User> {
    const userFound = await this.usersRepository.findById(id);

    if (!userFound) {
      throw new AppError("User with this id was not found.");
    }

    const user = await this.usersRepository.delete(userFound);

    return user;
  }
}

export default DeleteUserService;
