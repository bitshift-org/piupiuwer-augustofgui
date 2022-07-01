import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";
import Subscription from "../infra/typeorm/entities/Subscription";
import IUsersRepository from "../repositories/IUsersRepository";

interface Request {
  ownerId: string;
  followedId: string;
}

interface Response {
  subscription: Subscription;
  status: string;
}

@injectable()
class FollowUserService {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository
  ) {}

  async execute({ ownerId, followedId }: Request): Promise<Response> {
    const userFound = await this.usersRepository.findById(ownerId);

    if (!userFound) {
      throw new AppError("An user with this id was not found.");
    }

    const followedUser = await this.usersRepository.findById(followedId);

    if (!followedUser) {
      throw new AppError("Can't follow a user that does not exists.");
    }

    const existingSubscription = await this.usersRepository.findSubscription(
      userFound.id,
      followedId
    );

    if (existingSubscription) {
      const subscription = await this.usersRepository.unfollow(
        existingSubscription
      );
      return { subscription: existingSubscription, status: "unfollow" };
    }

    const subscription = await this.usersRepository.follow(
      userFound.id,
      followedId
    );
    return { subscription, status: "follow" };
  }
}

export default FollowUserService;
