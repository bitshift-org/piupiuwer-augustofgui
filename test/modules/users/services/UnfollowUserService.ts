import AppError from "../../../shared/errors/AppError";
import User from "../entities/User";
import IUsersRepository from "../repositories/IUsersRepository";

interface Request {
  userId: string;
  followedUserId: string;
}

class UnfollowUserService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute({ userId, followedUserId }: Request): Promise<User> {
    const userFound = await this.usersRepository.findUserById(userId);

    if (!userFound) {
      throw new AppError("An user with this id was not found.");
    }

    const followedUser = await this.usersRepository.findUserById(
      followedUserId
    );

    if (!followedUser) {
      throw new AppError("Can't follow a user that does not exists.");
    }

    const verifyFollow = await this.usersRepository.findFollowedUser(
      userFound.id,
      followedUserId
    );

    if (!verifyFollow) {
      throw new AppError("Can't unfollow a user that the user don't follows.");
    }

    const user = await this.usersRepository.removeFollow(
      userFound.id,
      followedUserId
    );

    return user;
  }
}

export default UnfollowUserService;
