import { injectable, inject } from "tsyringe";

import AppError from "../../../shared/errors/AppError";
import Piu from "../infra/typeorm/entities/Piu";
import IPiusRepository from "../repositories/IPiuRepository";

@injectable()
class DeletePiuService {
  constructor(
    @inject("PiusRepository") private readonly piusRepository: IPiusRepository
  ) {}

  public async execute(piuId: string): Promise<Piu> {
    const piu = await this.piusRepository.findById(piuId);

    if (!piu) {
      throw new AppError("A piu with this id was not found.", 404);
    }

    const deletedPiu = await this.piusRepository.delete(piu);

    return deletedPiu;
  }
}

export default DeletePiuService;
