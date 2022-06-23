import AppError from "../../../shared/errors/AppError";
import User from "../entities/User";
import IUsersRepository from "../repositories/IUserRepository";

interface Request {
  userId: string;
  followedUserId: string;
}

class FollowUserService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute({ userId, followedUserId }: Request): Promise<User> {
    const userFound = await this.usersRepository.findUserById(userId);

    if (!userFound) {
      throw new AppError("User with this id was not found.");
    }

    const followedUser = await this.usersRepository.findUserById(
      followedUserId
    );

    if (!followedUser) {
      throw new AppError("Can't follow a user that does not exists.");
    }

    const user = await this.usersRepository.followUser(
      userFound,
      followedUserId
    );

    return user;
  }
}

export default FollowUserService;
