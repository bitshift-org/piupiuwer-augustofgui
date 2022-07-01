import AppError from "../../../shared/errors/AppError";
import IUsersRepository from "../../users/repositories/IUsersRepository";
import Piu from "../infra/typeorm/entities/Piu";
import IPiusRepository from "../repositories/IPiuRepository";

interface IUserAction {
  piuId: string;
  userId: string;
}

class LikePiuService {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly piusRepository: IPiusRepository
  ) {}

  public async execute({ piuId, userId }: IUserAction): Promise<Piu> {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new AppError("An User with this id was not found.");
    }

    const piu = await this.piusRepository.findById(piuId);
    if (!piu) {
      throw new AppError("A Piu with this id was not found.");
    }

    piu.likedBy.push(userId);

    const likedPiu = await this.piusRepository.save(piu);

    return likedPiu;
  }
}

export default LikePiuService;
