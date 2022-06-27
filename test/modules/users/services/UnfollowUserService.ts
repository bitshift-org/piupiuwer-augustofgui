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
    const userFound = await this.usersRepository.findById(userId);

    if (!userFound) {
      throw new AppError("An user with this id was not found.");
    }

    const followedUser = await this.usersRepository.findById(
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

    userFound.follows.forEach((item, index) => {
      if (item === followedUserId) {
        userFound.follows.splice(index, 1);
      }
    });

    const user = await this.usersRepository.save(userFound);

    return user;
  }
}

export default UnfollowUserService;
