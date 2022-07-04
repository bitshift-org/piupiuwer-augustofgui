import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";
import IUsersRepository from "../repositories/IUsersRepository";
import Piu from "@modules/pius/infra/typeorm/entities/Piu";
import IPiusRepository from "@modules/pius/repositories/IPiuRepository";

@injectable()
class GetUserFeedService {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository,
    @inject("PiusRepository")
    private readonly piusRepository: IPiusRepository
  ) {}

  public async execute(userId: string): Promise<Piu[]> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError("An user with this id was not found.", 404);
    }

    const subscriptions = await this.usersRepository.findAllSubscriptions(
      userId
    );

    const feed: Piu[] = [];

    await Promise.all(subscriptions.map(async (item) => {
      const pius = await this.piusRepository.findAllPius(item.followed_id);
      feed.push(...pius);
    }));

    return feed;
  }
}

export default GetUserFeedService;
