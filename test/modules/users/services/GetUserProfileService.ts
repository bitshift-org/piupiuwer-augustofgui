import AppError from "../../../shared/errors/AppError";
import User from "../entities/User";
import IUsersRepository from "../repositories/IUsersRepository";

class GetUserProfileService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  public async execute(userId: string): Promise<User> {
    const user = await this.usersRepository.findUserById(userId);

    if (!user) {
      throw new AppError("An user with this id was not found.");
    }

    return user;
  }
}

export default GetUserProfileService;