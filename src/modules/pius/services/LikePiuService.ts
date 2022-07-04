import { injectable, inject } from "tsyringe";

import AppError from "../../../shared/errors/AppError";
import IUsersRepository from "../../users/repositories/IUsersRepository";
import Like from "../infra/typeorm/entities/Like";
import Piu from "../infra/typeorm/entities/Piu";
import IPiusRepository from "../repositories/IPiuRepository";

interface Request {
  piuId: string;
  userId: string;
}

interface Response {
  like: Like;
  status: string;
}

@injectable()
class LikePiuService {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository,

    @inject("PiusRepository")
    private readonly piusRepository: IPiusRepository
  ) {}

  public async execute({ piuId, userId }: Request): Promise<Response> {
    const piu = await this.piusRepository.findById(piuId);

    if (!piu) {
      throw new AppError("A piu with this id was not found.", 404);
    }
    
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new AppError("An user with this id was not found.", 401);
    }

    const existingLike = await this.piusRepository.findLike(piuId, userId);
    if (existingLike) {
      const like = await this.piusRepository.unlike(existingLike);
      return { like, status: "unliked" };
    }

    const like = await this.piusRepository.like(piuId, userId);
    return { like, status: "liked" };
  }
}

export default LikePiuService;
