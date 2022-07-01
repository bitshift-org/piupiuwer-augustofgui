import AppError from "../../../shared/errors/AppError";
import IUsersRepository from "../../users/repositories/IUsersRepository";
import Piu from "../infra/typeorm/entities/Piu";
import IPiusRepository from "../repositories/IPiuRepository";

interface IUserAction {
  piuId: string;
  userId: string;
}

class UnlikePiuService {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly piusRepository: IPiusRepository
  ) {}

  public async execute({ piuId, userId }: IUserAction): Promise<Piu> {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new AppError("An User with this id was nt found.");
    }

    const piu = await this.piusRepository.findById(piuId);
    if (!piu) {
      throw new AppError("A Piu with this id was not found.");
    }

    const userIndex = piu.likedBy.findIndex((user) => user === userId);
    
    if(userIndex == -1){
      throw new AppError("Can't unlike a piu that the user hasn't liked yet.");
    }

    piu.likedBy.splice(userIndex, 1);

    const unlikedPiu = await this.piusRepository.save(piu);

    return unlikedPiu;
  }
}

export default UnlikePiuService;
