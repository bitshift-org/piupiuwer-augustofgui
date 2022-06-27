import AppError from "../../../shared/errors/AppError";
import Piu from "../entities/Piu";
import IPiusRepository from "../repositories/IPiuRepository";

class DeletePiuService {
  constructor(private readonly piuRepository: IPiusRepository) {}

  public async execute(piuId: string): Promise<Piu> {
    const piu = await this.piuRepository.findById(piuId);

    if (!piu) {
      throw new AppError("A Piu with this id was not found.");
    }

    const deletedPiu = await this.piuRepository.delete(piu);

    return deletedPiu;
  }
}

export default DeletePiuService;
